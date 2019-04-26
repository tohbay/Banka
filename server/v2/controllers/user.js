import validate from '../../middleware/validate';
import helpers from '../../middleware/helpers';
import connectDB from '../../connectDB';

class userController {
  static signup(request, response) {
    if (!request.body.firstName || !request.body.lastName
      || !request.body.email || !request.body.password || !request.body.confirmPassword) {
      return response.status(400).json({
        status: 400,
        error: 'Ensure all fields are provided',
      });
    }

    const { value, error } = validate.signup(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }

    if (value.password !== value.confirmPassword) {
      return response.status(400).json({
        status: 400,
        error: 'Passwords do not match'
      });
    }

    const hashedPassword = helpers.encryptPassword(value.password);

    value.password = hashedPassword;
    const userEmail = value.email.toLowerCase();

    const newUser = {
      email: userEmail,
      firstName: value.firstName,
      lastName: value.lastName,
      password: hashedPassword
    };

    const query = `INSERT INTO users ("email", "firstName", "lastName", "password", "type", "isAdmin")
    VALUES('${newUser.email}','${newUser.firstName}','${newUser.lastName}','${newUser.password}', 'client', 'false') returning * `;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount >= 1) {
          return response.status(200).send({ status: 201, message: 'Sign up was successful' });
        }

        return response.status(500).send({ staus: 500, message: 'Unable to signup user' });
      })
      .catch((error) => {
        if (error.detail === `Key (email)=(${newUser.email}) already exists.`) {
          return response.status(400).send({ status: 409, error: 'User already exist' });
        }
        return response.status(500).send({ status: 500, message: 'Error creating account, ensure you provide valid credentials' });
      });
  }

  static signin(request, response) {
    if (!request.body.email || !request.body.password) {
      return response.status(400).json({
        status: 400,
        error: 'Email or Password is not provided',
      });
    }

    const { value, error } = validate.signin(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: error.details[0].message
      });
    }

    const user = {
      email: request.body.email,
      password: request.body.password
    };

    const token = helpers.issueToken(user);

    const query = `SELECT * FROM users WHERE email='${user.email}' AND password= crypt('${user.password}', password)`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        return response.status(200).send({ status: 200, message: 'You are successfully logged in', token });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error logging in, ensure you provide valid credentials' });
      });
  }
}

export default userController;

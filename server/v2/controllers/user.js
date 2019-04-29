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
        error: 'Invalid input, ensure input values are/is correct'
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

    const newUser = {
      email: value.email.toLowerCase(),
      firstName: value.firstName.toLowerCase(),
      lastName: value.lastName.toLowerCase(),
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
          return response.status(409).send({ status: 409, error: 'User already exist' });
        }
        return response.status(500).send({ status: 500, message: 'Error creating account, ensure you provide valid credentials' });
      });
  }

  static signin(request, response) {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        status: 400,
        error: 'Email or Password is not provided',
      });
    }

    const { value, error } = validate.signin(request.body);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid input, ensure input values are/is correct'
      });
    }

    const user = {
      email: value.email.toLowerCase(),
      password: value.password
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

  static getAllUsers(request, response) {
    const query = 'SELECT * FROM users';
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(404).send({
            status: 404,
            error: 'There are no user records'
          });
        }
        return response.status(200).send({
          status: 200,
          message: 'Users successfully retrieved',
          data: result.rows
        });
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          error: 'Error fetching all users, ensure you provide valid credentials'
        });
      });
  }

  static getOneUser(request, response) {
    const { email } = request.params;
    const { value, error } = validate.emailParams(request.params);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid input, ensure input value(s) are/is correct'
      });
    }
    const query = `SELECT * FROM users WHERE "email"='${email}'`;
    return connectDB.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(404).send({
            status: 404,
            error: 'User does not exist'
          });
        }
        return response.status(200).send({
          status: 200,
          message: 'Account successfully retrieved',
          data: result.rows[0]
        });
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          error: 'Error fetching the specific user, ensure you provide valid credentials'
        });
      });
  }

  static makeCashier(request, response) {
    const { email } = request.params;
    const { type } = request.body;

    const { value, error } = validate.emailParams(request.params);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid input, ensure input values are/is correct'
      });
    }


    const makeCashierQuery = `UPDATE users
      SET "type"='${type}' WHERE "email"='${email}' returning * `;
    return connectDB.query(makeCashierQuery)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(404).send({
            status: 404,
            error: 'Email does not exist'
          });
        }
        return response.status(200).send({
          status: 202,
          message: 'User successfully updated'
        });
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          error: 'Error updating the user, ensure you provide valid credentials'
        });
      });
  }

  static makeAdmin(request, response) {
    const { email } = request.params;

    const { value, error } = validate.emailParams(request.params);
    if (error) {
      return response.status(400).json({
        status: 400,
        error: 'Invalid input, ensure input values are/is correct'
      });
    }


    const makeAdminQuery = `UPDATE users
      SET "isAdmin"='true' WHERE "email"='${email}' returning * `;
    return connectDB.query(makeAdminQuery)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(404).send({
            status: 404,
            error: 'Email does not exist'
          });
        }
        return response.status(200).send({
          status: 200,
          message: 'User successfully updated'
        });
      })
      .catch((error) => {
        response.status(500).send({
          status: 500,
          error: 'Error updating the user, ensure you provide valid credentials'
        });
      });
  }
}

export default userController;

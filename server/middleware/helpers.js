import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  encryptPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  },
  comparePassword(plainPassword, encryptedPassword) {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  },
  issueToken({
    id, email, firstName, lastName, type, isAdmin
  }) {
    const token = jwt.sign({
      id, email, firstName, lastName, type, isAdmin
    }, process.env.jwt_secret, {
      expiresIn: '1d',
    });
    return token;
  }
};

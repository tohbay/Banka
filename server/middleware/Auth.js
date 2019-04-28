import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, process.env.jwt_secret, (err, data) => {
      if (err) {
        res.status(403).json({ status: 403, error: 'Access denied, provide token' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(403).json({ status: 403, error: 'Access denied, provide token' });
  }
}

export default verifyToken;

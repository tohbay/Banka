import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(request, response, next) {
  const bearerHeader = request.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    request.token = bearerToken;

    jwt.verify(request.token, process.env.jwt_secret, (err, decoded) => {
      if (err) {
        response.status(403).json({ status: 403, error: 'Access denied, provide token' });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    response.status(403).json({ status: 403, error: 'Access denied, provide token' });
  }
}

export default verifyToken;

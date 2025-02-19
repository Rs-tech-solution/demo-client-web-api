import { Middleware } from '../Helpers/Types.js';
import jwt from 'jsonwebtoken';

export enum allRoles {
  Admin = 'Admin',
  Donor = 'Donor',
  Guest = 'Guest',
  Other = 'Other',
}

export const validateToken: Middleware = async (request, response, next) => {
  const token = request.cookies['auth_token'];

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (error: any, decoded: jwt.JwtPayload) {
      if (error) {
        return response
          .status(401)
          .send({ message: 'Authentication Failed', error });
      }

      // Attach user details.
      response.locals.user = { ...decoded };

      next();
    }
  );
};

export function validateRole(allowedRoles: Array<string> = []) {
  const roleCheck: Middleware = async (request, response, next) => {
    if (allowedRoles.length > 0) {
      const { user } = response.locals;
      const userRole =
        user && user.roles.length ? user.role.trim().toLowerCase() : '';

      allowedRoles = allowedRoles.map((value) => value.toLowerCase());

      if (!allowedRoles.includes(userRole)) {
        return response
          .status(403)
          .send({ message: 'Unauthorized Access: Invalid role' });
      }
    }

    next();
  };

  return roleCheck;
}

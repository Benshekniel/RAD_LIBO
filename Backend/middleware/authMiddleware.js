import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
   const token = req.cookies.token; // Get the token from cookies

   if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
   }
};

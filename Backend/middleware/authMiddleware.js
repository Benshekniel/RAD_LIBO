import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
   const token = req.cookies.token; // Get the token from cookies
   console.log('Token from cookies:', token);
   if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add decoded token to req.user

      // Check if the user is a librarian for routes requiring librarian role
      if (req.user.role !== 'librarian') {
         return res.status(403).json({ message: 'Access denied, librarian only' });
      }

      // Proceed to next middleware or route handler
      next();
   } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
   }
};

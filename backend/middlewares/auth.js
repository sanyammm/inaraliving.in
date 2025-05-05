// Placeholder for admin auth middleware
const authMiddleware = (req, res, next) => {
  // Add token validation or admin check logic here
  next();
};

export default authMiddleware; // Use ES module default export

module.exports = checkRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role === "Super Admin") {
        return next();
      }
      if (req.user.role !== role) {
        throw new Error("Anda tidak memiliki akses");
      }
      next();
    } catch (error) {
      res.status(401).json({
        status: "failed",
        message: error.message,
      });
    }
  };
};

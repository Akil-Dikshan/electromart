export const adminOnly = (req, res, next) => {
  const userId = req.auth?.userId;
  const auth = req.auth()
  if (!userId) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized' 
    });
  }

  if (userId !== process.env.ADMIN_USER_ID) {
    return res.status(403).json({ 
      success: false, 
      message: 'Forbidden. Admin access only.' 
    });
  }

  next();
};
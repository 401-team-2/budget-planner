module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user && req.user.role === 'user' && !req.user.capabilities.includes(capability)) {
        return res.status(403).send('Access Denied');
      } else if (req.user && req.user.capabilities.includes(capability)) {
        return next();
      } else {
        return res.status(401).send('Unauthorized');
      }
    } catch (e) {
      return next('Invalid Login');
    }
  };
};

const isAdmin = (req, res, next) =>{
    console.log("isAdmin check:", req.session.user); 

  if (req.session.user && req.session.user.role === "admin") {
    return next(); 
  }
    return res.status(403).send("Access denied. Admins only.");
};

module.exports = isAdmin;
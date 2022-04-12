const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(!req.headers.authorization)
    return res.status(401).json({ error: "authrizathion erro" });
    const token = req.headers.authorization.split(" ")[1];
    
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "key");
  
    } catch (error) {
      return res.status(401).json({ error: "un able to verify" });
    }
    if(!decodedToken)
    {
      return res.status(401).json({ error: "authrizathion erro" });
    }
  
    req.userId=decodedToken.userId
    next();
  };
  
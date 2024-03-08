const jwt = require("jsonwebtoken");
const config = require("./config");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const tokenParts = token.split(" ");
    console.log(tokenParts);
    if (tokenParts[0] !== "Bearer" || tokenParts[1] === "null") {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const decoded = jwt.verify(
      tokenParts[1],
      config.SECRET_KEY
      // function (err, decoded) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(decoded);
      //   }
      // }
    );
    // console.log("po decoded");
    // console.log(decoded);
    // console.log(req.user);
    // console.log("wyjście z authenticate");
    // req.userId = decoded.userId;
    // req.email = decoded.email;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden." });
  }
};

module.exports = authenticateUser;

const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response.utils');

module.exports = async (req, res, next) => {

    let token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json(errorResponse(400, true, "Token is missing"));
    }

    token = token.slice(7, token.length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const admin = await admin.findone({ _id: decoded.id });
      
      if (admin) {
        next();
      } else {
        return res.status(400).json(errorResponse(400, true, "token is missing"));
      }
    } catch (err) {
        return res.status(401).json(errorResponse(401, true, "token is missing"));
    }

}
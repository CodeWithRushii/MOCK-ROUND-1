const express = require("express")
const adminRoute = express.Router()
const adminController = require("../../../controller/admin.controller");

adminRoute.post("/register", adminController.register);
adminRoute.post("/login", adminController.login);

module.exports = adminRoute
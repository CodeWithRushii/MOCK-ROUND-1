const express = require("express");
const managerRoute = express.Router();

const managerController = require("../../controller/manager.controller");
const { tokenValid, isAdmin } = require("../../config/auth.middleware");

managerRoute.post("/add", tokenValid, isAdmin, managerController.addManager);
managerRoute.get("/all", tokenValid, managerController.getAllManagers);
managerRoute.delete("/delete/:id", tokenValid, managerController.deleteManager);

module.exports = managerRoute;

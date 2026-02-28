const express = require("express")
const Route = express.Router()

Route.use("/auth", require("./auth/admin.route"))
Route.use("/manager", require("./manager/manager.route"))

module.exports = Route
const express = require("express")

const authRoute = express.Router()

authRoute.use("/admin", require("./admin/admin.route"))

module.exports = authRoute
const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "manager"
    },
    status: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: String,
        default: null
    },
    updated_date: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Manager", managerSchema)

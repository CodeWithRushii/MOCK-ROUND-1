const Admin = require("../model/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirm_password, designation, status } = req.body;

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const encryptedPassword = await bcrypt.hash(password, 12);

        const createdAdmin = new Admin({
            username,
            email,
            password: encryptedPassword,
            confirm_password: encryptedPassword, 
            designation,
            status: status !== undefined ? status : true,
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
        });

        await createdAdmin.save();
        res.status(201).json({ message: "Admin registered successfully", data: createdAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

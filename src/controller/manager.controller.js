const Manager = require("../model/manager.model");

exports.addManager = async (req, res) => {
    try {
        const { name, email, password, confirm_password, salary, designation, status } = req.body;

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const managerExists = await Manager.findOne({ email });
        if (managerExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const bcrypt = require("bcryptjs");
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdManager = new Manager({
            name,
            email,
            password: hashedPassword,
            confirm_password: hashedPassword,
            salary,
            designation,
            status: status !== undefined ? status : true,
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
        });

        await createdManager.save();
        res.status(201).json({ message: "Manager created successfully", data: createdManager });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find();
        res.status(200).json({ data: managers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        const removedManager = await Manager.findByIdAndDelete(id);
        if (!removedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({ message: "Manager removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
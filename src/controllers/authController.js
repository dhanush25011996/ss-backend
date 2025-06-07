const admin = require('../config/firebase');

const authController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userRecord = await admin.auth().createUser({ 
                email, 
                password 
            });
            
            res.status(201).json({ 
                message: "User created successfully", 
                data: userRecord 
            });
        } catch (error) {
            res.status(400).json({ 
                message: "Error creating user", 
                error: error.message 
            });
        }
    }
};

module.exports = authController;

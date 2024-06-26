const bcrypt = require('bcrypt');
const Auth = require('../models/auth.model'); // Ensure the path is correct to your 'auth' model

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Input validation (basic example, enhance as needed)
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const existingUser = await Auth.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await Auth.create({
            name,
            email,
            password: hashedPassword
        });

        // Respond with the created user (excluding the password)
        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await Auth.findOne({  email  });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllUser = async (req,res)=>{
    try {
        const data = await Auth.findAll();
        return res.status(200).json({
            message: 'User Data Fetch Sucessfully',
            userList: {
                data
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });    
    }
}
module.exports = {
    registerUser,
    loginUser,
    getAllUser
};

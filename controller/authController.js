const bcrypt = require("bcrypt");
const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken")
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation (basic example, enhance as needed)
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email already exists
    const existingUser = await Auth.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with the created user (excluding the password)
    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });


    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await Auth.findAll();
    return res.status(200).json({
      message: "User Data Fetch Sucessfully",
      userList: {
        data,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!id || (!name && !email && !password)) {
    return res.status(400).json({
      message: "User ID and at least one field to update are required",
    });
  }

  try {
    // Checking user
    const user = await Auth.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await Auth.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificUser = async (req, res) => {
  const id = req.params.userId;
  if (!id) {
    return res
      .status(201)
      .json({ message: "Please Input User Id inside the params" });
  }

  try {
    const user = await Auth.findOne({ where: { id } });
    return res
      .status(200)
      .json({ message: "User found sucessfully", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  updUser,
  getSpecificUser
};

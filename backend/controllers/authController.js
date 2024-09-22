const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.status(201).json({ user });
};

const login = async (req, res) => {
    
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { register, login };

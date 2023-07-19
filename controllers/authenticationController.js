const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const authenticationController = {
  signup: async (req, res) => {
    try {
      const newUser = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email: newUser.email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;
      
      // Save the user to the database
      let user = await User.create(newUser);
      console.log(user);
     
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  },
};

module.exports = authenticationController;
const addUser = (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log("controller");

      res.status(201).json({ message: 'Added USer!' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  };

  module.exports = addUser;
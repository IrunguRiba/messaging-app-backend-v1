const User = require("../users/user.model");
const contact = require("./auth.validator");
const jwt = require("jsonwebtoken");

module.exports = {
    signup: async (req, res) => {
        const { error, value } = contact.validate(req.body, { abortEarly: false });
        if (error) {
          const errors = error.details.map(err => ({
            field: err.path.join("."),
            message: err.message
          }));
          return res.status(400).json({ message: "Validation Error", errors });
        }
      
        const { username, phonenumber, email } = value;
      
        try {
          const query = [];
          query.push({ username }); //if there is a username, add it to the query
          if (email) query.push({ email }); //if there is an ema il, add it to the query
          if (phonenumber) query.push({ phonenumber }); //if there is a phone number, add it to the query
      
          const existingUser = await User.findOne({ $or: query }); // Check if any user exists with the same username, email, or phone number
    
          if (existingUser) {
            if (existingUser.username === username)
              return res.status(400).json({ message: "Username already exists" });
            if (existingUser.email && existingUser.email === email)
              return res.status(400).json({ message: "Email already exists" });
            if (existingUser.phonenumber && existingUser.phonenumber === phonenumber)
              return res.status(400).json({ message: "Phone number already exists" });
          }
       
    
          const newuser = new User({ username, phonenumber, email });
          await newuser.save();
      
          res.status(201).json({ message: "User created successfully", newuser });
        } catch (err) {
            
          if (err.code === 11000) { 
            const field = Object.keys(err.keyValue)[0]; //Get the field that caused the duplicate key error (e.g., username, email, or phonenumber)
            return res.status(400).json({ message: `${field} already exists` }); //Return a specific error message indicating which field is duplicated
          }
          console.error(err); 
          res.status(500).json({ message: "Internal Server Error" });
        }
      },

  signin: async (req, res) => {
    const { error, value } = contact.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Validation Error", errors });
    }
    const { phonenumber, email, username } = value;
    try {
        //Build a query object based on the provided fields (username, email, or phone number) to find the user in the database
      let query = { username }; //username WILL  be added add it to the query

      if (phonenumber) query.phonenumber = phonenumber;  //if there is a phone number, add it to the query
      if (email) query.email = email; //if there is an email, add it to the query
      const user = await User.findOne(query); // Find the user in the database based on the constructed query (which can include username, email, or phone number)

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Sign in successful", user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

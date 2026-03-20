const User = require("./user.model");
const mongoose = require("mongoose");

module.exports = {
  getallUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json({ users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getProfile: async (req, res) => {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const user = await User.findById(_id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateProfile: async (req, res) => {
    const { _id } = req.params;
    const updated = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const userExists = await User.findByIdAndUpdate(_id, updated, {
        new: true,
        runValidators: true, //To ensure the validator is run on update
      }).select("-password");
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile updated successfully",
        user: userExists,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteProfile: async (req, res) => {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const userExists = await User.findByIdAndDelete(_id);
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Profile deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  searchUsers: async (req, res) => {
    const { query } = req.query;
    const isValid = /^[a-zA-Z0-9_]+$/.test(query);
    if( !isValid) {
        return res.status(400).json({ message: "Enter a valid username" });
    }
    try {
      const users = await User.find({username: { $regex: query, $options: "i" }}).select("-password");
      
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found matching the query" });
      }
      
      res.json({ users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};


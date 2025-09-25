const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");


const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";


const createAdmin = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    
    const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = new User({
      username: ADMIN_USERNAME,
      password: hashedPassword,
      role: "admin",
    });

  await admin.save();
  
  } catch (error) {
    console.error(error);
  }
  
};
createAdmin();

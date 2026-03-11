const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongodb:process.env.MONGO_URI,
    port: process.env.PORT || 5000,
    jtwSecret:process.env.JWT_SECRET,
}



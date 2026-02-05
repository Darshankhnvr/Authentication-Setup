const mongoose = require("mongoose");

/**
 * User Schema for MongoDB.
 * Defines the structure of the user document.
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: 6,
        },
        phoneNumber: {
            type: String,
            required: [true, "Please add a phone number"],
            minlength: [10, "Phone number must be at least 10 digits"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);

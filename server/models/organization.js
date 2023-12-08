const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")

const organizationSchema = new Schema({
    orgName: {
        type: String,
        required: [true, "Organization name is required."],
        minLength: [2, "Organization name must be at least 2 characters long."],
    },
    orgEmail: {
        type: String,
        required: [true, "Organization email is required."],
        unique: [true, "Email already exists."],
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email is invalid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minLength: [8, "Password must be at least 8 characters long."],
    },
    orgAddress: {
        type: String,
        required: [true, "Organization address is required."],
    }
})

organizationSchema.pre("save", function(next) {
    console.log(this.password)
})

const Organization = mongoose.model("Organization", organizationSchema)
module.exports = Organization
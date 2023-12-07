const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")

const organizationSchema = new Schema({
    orgName: {
        type: String,
        required: true,
        minLength: [2, "Organization name must be at least 2 characters long."],
    },
    orgEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            va
        }
    },
    password: {
        type: String,
        required: true,
    },
    orgAddress: {
        type: String,
        required: true
    }
})
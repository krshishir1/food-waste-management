const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs")

const Organization = require("../models/organization");

// Register new organization
router.post("/register", async (req, res) => {
  try {
    const { orgName } = req.body;

    const organization = new Organization(req.body);
    await organization.save();

    res.status(201).json({ message: `New Organization ${orgName} created` });
  } catch (err) {
    const errors = err.errors;
    const validationErrors = [];

    if (err.name === "ValidationError") {
      for (let key in errors) {
        validationErrors.push({ type: key, message: errors[key].message });
      }

      return res
        .status(400)
        .json({ type: "validation", errors: validationErrors });
    }

    if (err.message.indexOf("duplicate key error") !== -1) {
      return res
        .status(401)
        .json({ type: "DuplicateEmail", message: "Email already exists" });
    }

    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { orgEmail, password } = req.body;

    console.log(`Email: ${orgEmail}, Password: ${password}`)

    const schema = Joi.object({
      orgEmail: Joi.string().email().required().messages({
        "string.email": "Email is invalid",
        "string.empty": "Organization Email is required"
      }),
      password: Joi.string().required().messages({
        "string.empty": "Password is required"
      }),
    });

    const { error } = schema.validate({ orgEmail, password });
    const isValid = error === undefined;

    if (!isValid) throw new Error(error.message);

    const orgDetails = await Organization.findOne({
      orgEmail,
    });

    if(!orgDetails) throw new Error("Email not found")

    const isUser = await bcrypt.compare(password, orgDetails.password)

    if(!isUser) throw new Error("Password incorrect")

    orgDetails.password = undefined
    res.status(200).json({ result: orgDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Getting organization by email
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    const schema = Joi.string().email().required().messages({
      "any.required": "Email is required",
    })

    const { error } = schema.validate(email)
    const isValid = error === undefined;

    if (!isValid) throw new Error(error.message);

    const result = await Organization.findOne({
      orgEmail: email,
    }).select({ password: 0 });

    if (!result) throw new Error("Organization not found");

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

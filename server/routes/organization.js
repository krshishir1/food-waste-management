const express = require("express");
const router = express.Router();

const Organization = require("../models/organization");

router.post("/save-restaurant", async (req, res) => {
  try {
    const { orgEmail, restaurant } = req.body;

    if (!orgEmail || !restaurant) throw new Error("No data received");

    const result = await Organization.findOne({ orgEmail }).select({
      password: 0,
    });

    if (!result) throw new Error("Organization not found");

    let restaurantExists = false;

    result.savedRestaurants.forEach((rest) => {
      const { poi : {name}, address: {municipality} } = rest;

      if(restaurant.poi.name === name && restaurant.address.municipality === municipality) {
        restaurantExists = true;
      }
    })

    if (restaurantExists) throw new Error(`Restaurant ${restaurant.poi.name} already saved`);

    const arr = [...result.savedRestaurants, restaurant];

    await Organization.updateOne(
      { orgEmail },
      {
        $set: {
          savedRestaurants: arr,
        },
      }
    );

    res.status(201).json({ message: "Restaurant saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-restaurant", async (req, res) => {
  try {
    const { orgEmail, restaurant } = req.body;

    if (!orgEmail || !restaurant) throw new Error("No data received");

    const result = await Organization.findOne({orgEmail}).select({password: 0});

    if (!result) throw new Error("Organization not found");

    const arr = result.savedRestaurants.filter((rest) => {
      const { poi : {name}, address: {municipality} } = rest;
      if(name === restaurant.poi.name && municipality === restaurant.address.municipality) {
        return false;
      }

      return true;
    })

    await Organization.updateOne(
      { orgEmail },
      {
        $set: {
          savedRestaurants: arr,
        },
      }
    );

    res.status(200).json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
})

module.exports = router;

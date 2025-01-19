const express = require("express");
const router = express.Router();
const {
  registration,
  getData,
  getSingleData,
  delData,
  login
} = require("./demoController.js");

router.post("/signup", registration);
router.post("/login", login); // Added login route
router.get("/data", getData);
router.get("/data/:id", getSingleData);
router.delete("/data/:id", delData);

module.exports = router;




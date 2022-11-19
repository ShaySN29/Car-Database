const express = require("express");
const router = express.Router();
const {addNewCar, listCars, listCarsOlderThanFiveYears, updateSingleCar, deleteCar, updateMultipleCars} = require("../controllers/car.controller");

router.post("/add", addNewCar);

router.get("/", listCars);

router.get("/oldercars", listCarsOlderThanFiveYears);

router.put("/updateone", updateSingleCar);

router.put("/updatemany", updateMultipleCars);

router.delete("/delete", deleteCar);

module.exports = router;
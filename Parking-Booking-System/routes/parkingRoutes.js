const express = require("express");
const {
  getParkingInfoController,
  updateProfileController,
  getParkingByIdController,
  parkingAppointmentsController,
  updateStatusController,
} = require("../controllers/parkingCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE Parking INFO
router.post("/getParkingInfo", authMiddleware, getParkingInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE Parking INFO
router.post("/getParkingById", authMiddleware, getParkingByIdController);

//GET Appointments
router.get(
  "/parking-appointments",
  authMiddleware,
  parkingAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;

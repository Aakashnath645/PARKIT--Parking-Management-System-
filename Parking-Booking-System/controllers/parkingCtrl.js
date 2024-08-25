const appointmentModel = require("../models/appointmentModel");
const parkingModel = require("../models/parkingModel");
const userModel = require("../models/userModels");
const getParkingInfoController = async (req, res) => {
  try {
    const parking = await parkingModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "parking data fetch success",
      data: parking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Parking Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const parking = await parkingModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Parking Profile Updated",
      data: parking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Parking Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getParkingByIdController = async (req, res) => {
  try {
    const parking = await parkingModel.findOne({ _id: req.body.parkingId });
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: parking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

const parkingAppointmentsController = async (req, res) => {
  try {
    const parking = await parkingModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      parkingId: parking._id,
    });
    res.status(200).send({
      success: true,
      message: "Parking Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/parking-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getParkingInfoController,
  updateProfileController,
  getParkingByIdController,
  parkingAppointmentsController,
  updateStatusController,
};

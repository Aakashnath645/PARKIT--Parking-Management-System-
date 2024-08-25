const parkingModel = require("../models/parkingModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllParkingsController = async (req, res) => {
  try {
    const parkings = await parkingModel.find({});
    res.status(200).send({
      success: true,
      message: "Parkings Data list",
      data: parkings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting parkings data",
      error,
    });
  }
};

// parking account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { parkingId, status } = req.body;
    const parking = await parkingModel.findByIdAndUpdate(parkingId, { status });
    const user = await userModel.findOne({ _id: parking.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "parking-account-request-updated",
      message: `Your Parking Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isParking = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: parking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllParkingsController,
  getAllUsersController,
  changeAccountStatusController,
};

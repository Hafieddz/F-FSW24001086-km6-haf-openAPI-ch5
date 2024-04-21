const Car = require("../models/Car");
const imagekit = require("../lib/imageKit");
const { default: mongoose } = require("mongoose");

const getCars = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      for (const key in req.query) {
        if (req.query[key]) {
          query[key] = { $regex: req.query[key], $options: "i" };
        }
      }
    }

    const cars = await Car.find(query)
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    res.status(200).json({
      status: "success",
      totalData: cars.length,
      data: {
        cars,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, rentPrice } = req.body;
    const file = req.file;
    let image;

    if (file) {
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      image = uploadedImage.url;
    }
    const newData = {
      name,
      rentPrice,
      image,
      createdBy: req.user._id,
    };

    const newCar = await Car.create(newData);
    res.status(200).json({
      status: "success",
      data: {
        newCar,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const requestBodyObject = req.body;

    if (Object.keys(requestBodyObject).length === 0) {
      throw new Error("Silahkan input data yang mau diupdate!");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Id yang diinput tidak valid!");
    }

    const newData = {
      ...req.body,
      updatedBy: req.user._id,
      updatedAt: Date.now(),
    };

    const updatedCar = await Car.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    res.status(200).json({
      status: "success",
      data: {
        updatedCar,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, name } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Id yang diinput tidak valid!");
    }

    const deletedCar = await Car.findByIdAndDelete(id);
    const userInfo = { _id, name };

    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
      data: {
        deletedCar,
        deletedBy: userInfo,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Id yang diinput tidak valid!");
    }

    const car = await Car.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarById,
};

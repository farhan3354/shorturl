const Doctor = require("../models/doctorProfile.js");

const createDoctor = async (req, res) => {
  try {
    const {
      specialization,
      subspecilized,
      certificate,
      insitiute,
      yearcertifi,
      attachment,
      experienceinstitute,
      experiencefrom,
      experienceto,
      experienceattachment,
      country,
      state,
      lience,
    } = req.body;
    if (
      !specialization ||
      !subspecilized ||
      !certificate ||
      !insitiute ||
      !yearcertifi ||
      !attachment ||
      !experienceinstitute ||
      !experiencefrom ||
      !experienceto ||
      !experienceattachment ||
      !country ||
      !state ||
      !lience
    ) {
      return res
        .status(409)
        .json({ success: false, message: "All the feilds are required" });
    }

    const doctor = await Doctor.create({
      specialization,
      subspecilized,
      certificate,
      insitiute,
      yearcertifi,
      attachment,
      experienceinstitute,
      experiencefrom,
      experienceto,
      experienceattachment,
      country,
      state,
      lience,
    });

    return res.status(201).json(doctor);
  } catch (error) {
    return res.status(400).json({ message: "Error creating doctor" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching doctors" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.user.id;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.user.id;

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: "Error updating doctor", error });
  }
};

module.exports = { createDoctor, getDoctors, getDoctorById };

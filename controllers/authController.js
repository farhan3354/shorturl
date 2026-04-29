import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, city, email, phone, langua, password, role } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !city ||
      !email ||
      !phone ||
      !langua ||
      !password ||
      !role
    ) {
      return res
        .status(409)
        .json({ success: false, message: "All the feilds are required" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exist in the database",
      });
    }
    const hanshpassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      firstname,
      lastname,
      city,
      email,
      phone,
      langua,
      password: hanshpassword,
      role,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created successfully " });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No data in the database" });
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res
        .status(409)
        .json({ success: false, message: "Password miss match" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res
      .status(200)
      .json({ success: true, message: "You have successfully login", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No record in the database" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json("Server Errro");
  }
};

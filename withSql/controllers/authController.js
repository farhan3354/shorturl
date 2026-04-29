import { pool } from "../config/sqldb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserTable } from "../sqlTable/User.js";

export const getDoctor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM doctor");

    console.log(rows);
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting doctor",
      error: error.message,
    });
  }
};

export const getIdDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const [row] = await pool.query("SELECT * FROM doctor WHERE DoctorId = ?", [
      doctorId,
    ]);

    if (row.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({ success: true, data: row[0] });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting doctor by id",
      error: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const roomid = req.params.id;
    if (!roomid) {
      return res
        .status(400)
        .json({ success: false, message: "Room id is required" });
    }
    const [row] = await pool.query("DELETE FROM room WHERE RoomId = ?", [
      roomid,
    ]);
    if (row.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eror from the server", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, email, phone, password",
      });
    }
    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE Email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO User (Name, Email, Phone, Password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword],
    );
    const token = jwt.sign(
      { userId: result.insertId, email: email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" },
    );
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: result.insertId,
        name: name,
        email: email,
        phone: phone,
      },
      token: token,
    });
  } catch (error) {
    console.error("Create user error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const [row] = await pool.query("Select * from user");
    console.log(row);
    return res.status(200).json({ success: true, data: row });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {email,password }= req.body;
    if(!email ||!password){
      return res.status(400).json({
        success:false,
        message:"Email and password are required"
      });
    }
    const [exist]= await pool.query("SELECT EMAIL FROM USER WHERE EMAIL = ?",[email]);
    if(exist.length == 0){
      return res.status(404).json({
        success:false,
        message:"User not found"
      }); 
    }
  const passwordcheck = await bcrypt.compare(password,exist[0].password);
  if(!passwordcheck){
    return res.status(401).json({
      success:false,
      message:"Invalid password"
    }); 
  }
  const token = jwt.sign(
    { userId: exist[0].id, email: exist[0].email },
    process.env.JWT_SECRET || "secretkey",      
    { expiresIn: "1d" },
  );
  return res.status(200).json({
    success:true,
    message:"Login successful",
    token:token
  });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

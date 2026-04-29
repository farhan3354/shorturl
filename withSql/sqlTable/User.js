import { pool } from "../config/sqldb.js";

export const createUserTable = async () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS USER (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(20) NOT NULL,
        EMAIL VARCHAR(255) UNIQUE NOT NULL,
        PHONE VARCHAR(20) NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await pool.query(sql);
    console.log("✅ User table created successfully");
  } catch (error) {
    console.error("❌ Error creating user table:", error.message);
    throw error;
  }
};
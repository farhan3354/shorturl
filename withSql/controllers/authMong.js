export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All the feilds are required" });
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
    });
    return res
      .status(500)
      .json({ message: "Doctor add successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error registering doctor",
      error: error.message,
    });
  }
};

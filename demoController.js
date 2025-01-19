const Demo = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registration = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const demo = new Demo({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await demo.save();

    // Generate a token
    const token = jwt.sign({ id: demo._id, role: demo.role }, "876767ghhhjhj", {
      expiresIn: "1h",
    });

    res.status(201).json({ demo, token });
  } catch (error) {
    console.error("Error in creating products ", error);
    res.status(400).json({ error: error.message });
  }
};

// FetchAPI
const getData = async (req, res) => {
  try {
    const data = await Demo.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(res.json(404));
  }
};

// SingleAPI
const getSingleData = async (req, res) => {
  try {
    const { id } = req.params;
    const singleApi = await Demo.findById({ _id: id });
    res.status(200).json(singleApi);
  } catch (error) {
    res.status(400).json(error);
  }
};

// DeleteAPI
const delData = async (req, res) => {
  try {
    const { id } = req.params;
    await Demo.findByIdAndDelete({ _id: id });
    res.status(200).json("data deleted successfully");
  } catch (error) {
    res.status(400).json({ error, message: error.message });
  }
};

// login controller
const login = async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await Demo.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "876767ghhhjhj", {
      expiresIn: "1h",
    });
    res.status(200).json({ token,role: user.role });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registration,
  getData,
  getSingleData,
  delData,
  login,
};
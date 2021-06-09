const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const Users = require('../models/users');

async function checkUserPassword(email, password) {
  const user = await Users.findOne({email}).lean();

  if(!user) {
    return null;
  }

  const compare = bcrypt.compareSync(password, user.password);

  if(!compare) {
    return null;
  }

  return user;
}

function generateToken() {
  const token = sign({
    exp: parseInt(process.env.JWT_EXP, 10) || Math.round((new Date().getTime() / 1000)) + 3600,
  }, process.env.JWT_KEY || 'shhhhh');

  return token;
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await checkUserPassword(email, password);

    if (!user) {
      res.status(400);
      return res.json({ error: "Incorrect email or password, cannot complete login!" });
    }

    const token = generateToken();

    return res.json({ token, userId: user["_id"] });
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

module.exports = loginController;

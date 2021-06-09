const { verify } = require('jsonwebtoken');
const Users = require('../models/users');

async function getUserProjects(userId) {
  const user = await Users.findOne({ _id: userId }).lean();

  if(!user) {
    return [];
  }

  return user.projects || [];
}

function verifyToken(token) {
  verify(token, process.env.JWT_KEY || 'shhhhh');
}

const listProjectsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { authorization } = req.headers;

    await verifyToken(authorization);

    const projects = await getUserProjects(userId);

    return res.json(projects);
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

module.exports = listProjectsController;

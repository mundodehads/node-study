const { verify } = require('jsonwebtoken');
const Users = require('../models/users');

async function AddNewProject(userId, name) {
  const user = await Users.findOne({ _id: userId }).lean();

  if(user) {
    const projects = [...(user.projects || [])];
    projects.push({ name, tasks: [] });

    await Users.updateOne({ _id: userId }, { projects });
  }
}

function verifyToken(token) {
  verify(token, process.env.JWT_KEY || 'shhhhh');
}

const newProjectController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { authorization } = req.headers;
    const { name } = req.body;

    await verifyToken(authorization);

    await AddNewProject(userId, name);

    res.status(204);
    return res.send('');
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

module.exports = newProjectController;

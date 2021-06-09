const { verify } = require('jsonwebtoken');
const Users = require('../models/users');

async function AddNewTask(userId, index, tasks) {
  const user = await Users.findOne({ _id: userId }).lean();

  if(user) {
    const projects = [...user.projects];
    projects[index].tasks = tasks;

    await Users.updateOne({ _id: userId }, { projects });
  }
}

function verifyToken(token) {
  verify(token, process.env.JWT_KEY || 'shhhhh');
}

const newTaskController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { authorization } = req.headers;
    const { index, tasks } = req.body;

    await verifyToken(authorization);

    await AddNewTask(userId, index, tasks);

    res.status(204);
    return res.send('');
  } catch (error) {
    res.status(500);
    return res.json({ error: error.message });
  }
};

module.exports = newTaskController;

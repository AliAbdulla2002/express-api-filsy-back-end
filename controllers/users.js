const User = require('../models/user')

const index = async function (req, res) 
{
   const users = await User.find()
   res.json(users)
}

module.exports = {
    index,
}
const con = require('../config/database.js')
exports.updateUser = async (id, username, email) => {
  try {
    const result = await con.query(`UPDATE user SET username = ?, email = ? WHERE id = ?`, [username, email, id]);
    const user = { id, username, email };
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.deleteUser = (id, callback) => {
  con.query(`DELETE FROM user WHERE id = ?`, [id], (error, result) => {
    // console.log(result)
    if (error) {
      return callback('error: ' + error)
    }
    return callback(null, result);
  });
};


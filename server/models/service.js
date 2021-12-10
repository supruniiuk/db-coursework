const pool = require("../database");

const query = async () => {
  await pool.connect();
};



const getPages = async (table) => {
    const pageQuery = `SELECT COUNT(*) FROM ${table};`;
    let page = null;
  
    await pool
      .query(pageQuery)
      .then((res) => {
        page = res.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
  
    return +page.count;
  }

  module.exports = {
    getPages
  };
  
  query();
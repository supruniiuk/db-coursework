const redis = require("redis");
const clientRedis = redis.createClient();
clientRedis.connect();

module.exports = async function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }

  const role = req.params.rolename;

  let data = await clientRedis.get(role);

  if (data == null) {
    return next();
  } else {
    return res.json(JSON.parse(data));
  }
};



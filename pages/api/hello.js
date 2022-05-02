import nc from "next-connect";
var Cookies = require("cookies");

const handler = nc();

handler.post(async (req, res) => {
  try {
    var keys = ["keyboard cat"];
    var cookies = new Cookies(req, res, { keys: keys });
    cookies.set(req.body.key, req.body.value, {
      expires: new Date(9999, 0, 1),
      httpOnly: false,
      signed: false,
    });
  } catch (err) {
    return res.send({
      message: "Hi Cookie setting was unsuccessfully",
      key: req.body.key,
      value: req.body.value,
    });
  }

  return res.send({
    message: "Hi Cookie set successfully",
    key: req.body.key,
    value: req.body.value,
  });
});

export default handler;

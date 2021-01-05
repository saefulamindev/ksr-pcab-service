const response = {
  meta: {
    code: 200,
    status: "success",
    message: null,
  },
  data: null,
};

module.exports.success = (res, data = null, message = null) => {
  response.meta.status = "success";
  response.meta.message = message;
  response.meta.code = 200;
  response.data = data;
  res.status(response.meta.code).json(response);
};

module.exports.badRequest = (res, data = null, message = null) => {
  response.meta.status = "bad request";
  response.meta.message = message;
  response.meta.code = 400;
  response.data = data;
  res.status(response.meta.code).json(response);
};

module.exports.error = (res, data = null, message = null, code = 400) => {
  console.log(response.meta.status);
  response.meta.status = "error";
  response.meta.code = code;
  response.meta.message = message;
  response.data = data;
  res.status(response.meta.code).json(response);
};

const biodataServices = require("../services/biodataServices");

const biodataController = {
  get: async (req, res, next) => {
    try {
      const result = await biodataServices.get();

      //   const user = await UserService.getUserById(result[0]);

      //   const resResult {
      //       id: user.id,
      //       email: user.email,
      //   };
      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = biodataController;

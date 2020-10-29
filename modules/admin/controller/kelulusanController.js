const kelulusanServices = require("../services/kelulusanServices");

const kelulusanController = {
  get: async (req, res, next) => {
    try {
      const result = await kelulusanServices.get(req);

      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await kelulusanServices.updateData(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil update data",
          id_user: req.params.id_user,
          nilai_akhir: req.body.nilai_akhir,
          status_kelulusan: req.body.status_kelulusan,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = kelulusanController;

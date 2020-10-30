const soalServices = require("./../services/soalServices");

const soalController = {
  getPG: async (req, res, next) => {
    try {
      const data = await soalServices.getPGsoal(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  createPG: async (req, res, next) => {
    console.log("cobaa");
    try {
      const input = await soalServices.createPGsoal(req.body);

      const newInput = await soalServices.getPGsoalById(input[0]);

      const resBerhasil = {
        message: "berhasil menambah soal pg",
        id: newInput.id,
        text_soal: newInput.text_soal,
        opsi_1: newInput.opsi_1,
        opsi_2: newInput.opsi_2,
        opsi_3: newInput.opsi_3,
        opsi_4: newInput.opsi_4,
        kunci: newInput.kunci,
        skor: newInput.skor,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah soal PG",
      };

      return res.status(500).send(resGagal);
    }
  },
  updatePG: async (req, res, next) => {
    try {
      const result = await soalServices.updatePGsoal(req);

      const newUpdate = await soalServices.getPGsoalById(result);

      const resBerhasil = {
        message: "berhasil mengubah soal pg",
        id: newUpdate.id,
        text_soal: newUpdate.text_soal,
        opsi_1: newUpdate.opsi_1,
        opsi_2: newUpdate.opsi_2,
        opsi_3: newUpdate.opsi_3,
        opsi_4: newUpdate.opsi_4,
        kunci: newUpdate.kunci,
        skor: newUpdate.skor,
      };
      if (result) {
        return res.status(200).json(resBerhasil);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deletePG: async (req, res, next) => {
    try {
      const result = await soalServices.deletePGsoal(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //   Soal Essay
  getEssay: async (req, res, next) => {
    try {
      const data = await soalServices.getEssaySoal(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  createEssay: async (req, res, next) => {
    try {
      const input = await soalServices.createEssaySoal(req.body);

      const newInput = await soalServices.getEssaySoalById(input[0]);

      const resBerhasil = {
        message: "berhasil menambah soal essay",
        id: newInput.id,
        text_soal: newInput.text_soal,
        skor: newInput.skor,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah soal essay",
      };

      return res.status(500).send(resGagal);
    }
  },
  updateEssay: async (req, res, next) => {
    try {
      const result = await soalServices.updateEssaySoal(req);

      const newUpdate = await soalServices.getEssaySoalById(result);

      const resBerhasil = {
        message: "berhasil mengubah soal essay",
        id: newUpdate.id,
        text_soal: newUpdate.text_soal,
        skor: newUpdate.skor,
      };
      if (result) {
        return res.status(200).json(resBerhasil);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteEssay: async (req, res, next) => {
    try {
      const result = await soalServices.deleteEssaySoal(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = soalController;

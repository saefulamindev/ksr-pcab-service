const nilaiServices = require("./../services/nilaiServices");

const nilaiController = {
  // ===============================Nilai Fisik =========================
  getFisik: async (req, res, next) => {
    try {
      const data = await nilaiServices.getFisikNilai(req);
      // console.log(data);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateFisik: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateFisikNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          id_user: req.params.id_user,
          nilai_fisik: req.body.nilai_fisik,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //================================= Nilai Afektif ============================
  getAfektif: async (req, res, next) => {
    try {
      const data = await nilaiServices.getAfektifNilai(req);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  createAfektif: async (req, res, next) => {
    try {
      const cekAfektifNilai = await nilaiServices.getAfekitfNilaiByIdUser(
        req.body.id_user
      );

      if (cekAfektifNilai) {
        return res.json({
          message: "nilai afektif sudah ada",
        });
      }
      const input = await nilaiServices.createAfektifNilai(req.body);

      const newAfektif = await nilaiServices.getAfekitfNilaiById(input[0]);

      const resBerhasil = {
        message: "berhasil menambah nilai afektif",
        id: newAfektif.id,
        id_user: newAfektif.id_user,
        tg_jawab: newAfektif.tg_jawab,
        disiplin: newAfektif.disiplin,
        kerjasama: newAfektif.kerjasama,
      };

      return res.status(201).send(resBerhasil);
    } catch (error) {
      const resGagal = {
        message: "gagal menambah nilai afektif",
      };

      return res.status(500).send(resGagal);
    }
  },
  updateAfektif: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateAfektifNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          tg_jawab: req.body.tg_jawab,
          disiplin: req.body.disiplin,
          kerjasama: req.body.kerjasama,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteAfektif: async (req, res, next) => {
    try {
      const result = await nilaiServices.deleteAfektifNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil menghapus data",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // ==========================Nilai Essay================================
  getEssay: async (req, res, next) => {
    console.log(req.params);
    try {
      const id_essay = await nilaiServices.getEssayByJenis(
        req.params.jenis_test,
        req.params.id_user
      );

      return res.status(200).send(id_essay);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  updateEssay: async (req, res, next) => {
    try {
      const result = await nilaiServices.updateEssayNilai(req);

      if (result) {
        return res.status(200).json({
          message: "berhasil mengubah data",
          nilai_essay: req.body.nilai_essay,
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = nilaiController;

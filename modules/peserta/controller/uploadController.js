const pembayaranServices = require("../services/pembayaranServices");
const responseFormatter = require("../../../responses/responses");
const uploadServices = require("../../peserta/services/uploadServices");

const uploadController = {
  uploadBuktiBayarPendaftaran: async (req, res, next) => {
    try {
      if (!req.file) {
        res.send({
          message: "harus upload file bukti bayar",
        });
      }
      const { jenis_bayar, id_user } = req.body;
      const bukti_bayar = req.file.path;
      const cekNominal = await pembayaranServices.cekNominalByJenisBayar(
        jenis_bayar,
        id_user
      );
      const Tagihan = await pembayaranServices.cekTagihan(jenis_bayar);
      console.log(cekNominal.nominal, Tagihan.nominal);
      if (cekNominal.nominal >= Tagihan.nominal) {
        return res.send({
          message: "Tagihan Lunas",
        });
      }
      const input = await pembayaranServices.tambahTransaksiBayar(
        jenis_bayar,
        id_user,
        bukti_bayar
      );
      const newInput = await pembayaranServices.getTransaksiBayarById(input[0]);

      return res.status(201).send({
        message: "berhasil mengupload pembayaran",
        id: newInput.id,
        id_user: req.body.id_user,
        nominal: newInput.nominal,
        jenis_bayar: newInput.jenis_bayar,
        bukti_bayar: newInput.bukti_bayar,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send({
        message: "gagal menambah pembayaran",
      });
    }
  },

  uploadDokumenPendaftaran: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const file_form_pendaftaran = req.file.path;
      // console.log(req.file.path);

      const cek = await uploadServices.getDokumenPendaftaranByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }

      if (!file_form_pendaftaran) {
        return responseFormatter.error(res, null, "file harus diupload", 422);
      }

      const result = await uploadServices.updateBerkasPendaftaran(
        id_user,
        file_form_pendaftaran
      );
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user, file_form_pendaftaran }),
          "berhasil upload",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  uploadSuratPersetujuan: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const file_persetujuan = req.file.path;
      // console.log(req.file.path);
      const cek = await uploadServices.getDokumenPendaftaranByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      if (!file_persetujuan) {
        return responseFormatter.error(res, null, "file harus diupload", 422);
      }
      const result = await uploadServices.updateSuratPersetujuan(
        id_user,
        file_persetujuan
      );
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user, file_persetujuan }),
          "berhasil upload",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  uploadSuratKomitmen: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const file_komitmen = req.file.path;
      // console.log(req.file.path);
      const cek = await uploadServices.getDokumenPendaftaranByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      if (!file_komitmen) {
        return responseFormatter.error(res, null, "file harus diupload", 422);
      }
      const result = await uploadServices.updateSuratKomitmen(
        id_user,
        file_komitmen
      );
      if (result) {
        return responseFormatter.success(
          res,
          (data = { id_user, file_komitmen }),
          "berhasil upload",
          200
        );
      }
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  // ERROR DISINI
  uploadBerkasPendaftaran: async (req, res, next) => {
    try {
      const { id_user } = req.params;
      const file_form_pendaftaran = req.files.file_form_pendaftaran.map(
        (file) => file.path
      );
      const file_persetujuan = req.files.file_persetujuan.map(
        (file) => file.path
      );
      const file_komitmen = req.files.file_komitmen.map((file) => file.path);

      console.log(file_form_pendaftaran);
      const cek = await uploadServices.getDokumenPendaftaranByIdUser(id_user);
      if (!cek) {
        return responseFormatter.badRequest(res, null, "data tidak ditemukan");
      }
      if (!file_form_pendaftaran && !file_persetujuan && !file_komitmen) {
        return responseFormatter.error(
          res,
          null,
          "file form pendaftaran harus diupload",
          422
        );
      }
      // if (!file_persetujuan) {
      //   return responseFormatter.error(
      //     res,
      //     null,
      //     "file persetujuan harus diupload",
      //     422
      //   );
      // }
      // if (!file_komitmen) {
      //   return responseFormatter.error(
      //     res,
      //     null,
      //     "file komitmen harus diupload",
      //     422
      //   );
      // }

      // const file_form_pendaftaran = req.files.objName[0].path;
      // const file_persetujuan = req.files.objName[1].path;
      // const file_komitmen = req.files.objName[2].path;

      // const file_form_pendaftaran = req.files.map((file) => file.path);
      // const file_persetujuan = req.files.map((file) => file.path);
      // const file_komitmen = req.files.map((file) => file.path);

      // console.log(file_form_pendaftaran);
      // console.log(file_persetujuan);
      // console.log(file_komitmen);
      // console.log(req.file.path);

      const result = await uploadServices.updateBerkasPendaftaranAll(
        id_user,
        file_form_pendaftaran,
        file_persetujuan,
        file_komitmen
      );
      if (result) {
        return responseFormatter.success(
          res,
          (data = {
            id_user,
            file_form_pendaftaran,
            file_persetujuan,
            file_komitmen,
          }),
          "berhasil upload",
          200
        );
      }
    } catch (error) {
      console.log(error.message);
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },
};

module.exports = uploadController;

const pesertaServices = require("../services/pesertaServices");
const responseFormatter = require("../../../responses/responses");
const { InternalServerError } = require("http-errors");

const pesertaController = {
  isiForm: async (req, res, next) => {
    try {
      if (!req.file) {
        return responseFormatter.error(res, null, "foto harus diupload", 422);
      }

      const {
        id_user,
        tahun_daftar,
        noreg,
        nama_lengkap,
        tanggal_lahir,
        tempat_lahir,
        jenis_kelamin,
        alamat_ktp,
        alamat_sekarang,
        golongan_darah,
        agama,
        fakultas,
        prodi,
        angkatan,
        nomor_hp,
        riwayat_penyakit,
        nama_orangtua,
        alamat_orangtua,
        nohp_orangtua,
        nohp_orangdekat,
      } = req.body;
      // console.log(req.body);
      const file_foto = req.file.path;
      // console.log(req.file);

      if (!req.body) {
        return responseFormatter.error(
          res,
          null,
          "harap isi semua formulir",
          400
        );
      }

      const biodata = await pesertaServices.isiForm(
        id_user,
        tahun_daftar,
        noreg,
        nama_lengkap,
        tanggal_lahir,
        tempat_lahir,
        jenis_kelamin,
        alamat_ktp,
        alamat_sekarang,
        golongan_darah,
        agama,
        fakultas,
        prodi,
        angkatan,
        nomor_hp,
        riwayat_penyakit,
        nama_orangtua,
        alamat_orangtua,
        nohp_orangtua,
        nohp_orangdekat,
        file_foto
      );
      // console.log(biodata);

      const newInput = await pesertaServices.getPesertaByIdUser(id_user);
      return responseFormatter.success(
        res,
        (data = {
          id_user: newInput.id_user,
          tahun_daftar: newInput.tahun_daftar,
          noreg: newInput.noreg,
          nama_lengkap: newInput.nama_lengkap,
          tanggal_lahir: newInput.tanggal_lahir,
          tempat_lahir: newInput.tempat_lahir,
          jenis_kelamin: newInput.jenis_kelamin,
          alamat_ktp: newInput.alamat_ktp,
          alamat_sekarang: newInput.alamat_sekarang,
          golongan_darah: newInput.golongan_darah,
          agama: newInput.agama,
          fakultas: newInput.fakultas,
          prodi: newInput.prodi,
          angkatan: newInput.angkatan,
          nomor_hp: newInput.nomor_hp,
          riwayat_penyakit: newInput.riwayat_penyakit,
          nama_orangtua: newInput.nama_orangtua,
          alamat_orangtua: newInput.alamat_orangtua,
          nohp_orangtua: newInput.nohp_orangtua,
          nohp_orangdekat: newInput.nohp_orangdekat,
          file_foto: file_foto,
        }),
        "Berhasil mengisi form",
        200
      );
    } catch (error) {
      return responseFormatter.error(res, null, "Internal Server Error", 500);
    }
  },
};

module.exports = pesertaController;

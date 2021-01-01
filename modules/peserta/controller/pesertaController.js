const pesertaServices = require("../services/pesertaServices");

const pesertaController = {
  isiForm: async (req, res, next) => {
    try {
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
        file_form_pendaftaran,
        file_persetujuan,
        file_komitmen,
        file_foto,
      } = req.body;
      const data = await pesertaServices.isiForm(
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
        file_form_pendaftaran,
        file_persetujuan,
        file_komitmen,
        file_foto
      );

      const newInput = await pesertaServices.getPesertaById(data[0]);

      return res.status(200).send({
        message: "berhasil isi form",
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
        file_form_pendaftaran: newInput.file_form_pendaftaran,
        file_persetujuan: newInput.file_persetujuan,
        file_komitmen: newInput.file_komitmen,
        file_foto: newInput.file_foto,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

module.exports = pesertaController;

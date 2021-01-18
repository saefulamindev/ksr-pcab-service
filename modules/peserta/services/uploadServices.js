const db = require("../../../config/database");

const uploadServices = {
  uploadDokumenPendaftaran: async (file_form_pendaftaran) => {
    const images = await db("tb_peserta").insert({
      file_form_pendaftaran: file_form_pendaftaran,
    });
    return images;
  },
  getDokumenPendaftaranByIdUser: (id_user) => {
    const data = db("tb_peserta").where({ id_user }).first();
    return data;
  },
  updateBerkasPendaftaranAll: async (
    id_user,
    file_form_pendaftaran,
    file_persetujuan,
    file_komitmen
  ) => {
    const updateHasil = await db("tb_peserta")
      .update({
        file_form_pendaftaran: file_form_pendaftaran,
        file_persetujuan: file_persetujuan,
        file_komitmen: file_komitmen,
      })
      .where({
        id_user,
      });
    return updateHasil;
  },
  updateSuratPersetujuan: async (id_user, file_persetujuan) => {
    const updateHasil = await db("tb_peserta")
      .update({
        file_persetujuan: file_persetujuan,
      })
      .where({
        id_user,
      });
    return updateHasil;
  },
  updateBerkasPendaftaran: async (id_user, file_form_pendaftaran) => {
    const updateHasil = await db("tb_peserta")
      .update({
        file_form_pendaftaran: file_form_pendaftaran,
      })
      .where({
        id_user,
      });
    return updateHasil;
  },
  updateSuratKomitmen: async (id_user, file_komitmen) => {
    const updateHasil = await db("tb_peserta")
      .update({
        file_komitmen: file_komitmen,
      })
      .where({
        id_user,
      });
    return updateHasil;
  },
};

module.exports = uploadServices;

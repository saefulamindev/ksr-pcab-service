const db = require('../../../config/database');

const adminService = {
    countUserById: (id) => {
        const user = db('tb_users').where('', id).first();
        return user;
    }
    
};


module.exports = adminServices;
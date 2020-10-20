const { response } = require('express');
const db = require('../../config/database');
const refCaptchaService = require('./refCaptchaController');

const refCaptchaService = {
    get: async () => {
        try {
            const chaptchas = await db('ref_captcha').select('*');
            const randomCaptcha = chaptchas[Math.floor(Math.random() * chaptchas.length)];
            // return chaptchas;
            return response.ok(randomCaptcha);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
}

module.exports = refCaptchaService;


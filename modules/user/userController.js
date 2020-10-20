const UserService = require('../user/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = bcrypt.genSaltSync(10);
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const UserController = {
    getUser: (req, res, next) => {
        res.json(req.user);
    },
    
    login: async (req, res, next) => {
        try {
            console.log('req.body: ', req.body);
            const user = await UserService.getUserByEmail(req.body.email);
            
            if(!user) {
                res.status(401).send('Email Salah');
            }

            const match = await bcrypt.compare(req.body.password, user.password);

            if (!match) {
                res.status(401).send('Password Salah');
            }

            const tokenJWT = jwt.sign({
                data: {id: user.id}
            }, process.env.SECRET, { expiresIn: '1h'});

            const data = {
                id: user.id,
                email: user.email,
                role: user.role,
                tahap: user.tahap,
                token: tokenJWT,
            }

            res.json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    daftar: async (req, res, next) => {
        try {
            console.log('req.body: ', req.body);

            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

            const cekUser = await UserService.getUserByEmail(req.body.email, user.email);
            if(cekUser) {
                        
                return "Email sudah ada"
            }            
            else  {
                const user = await UserService.createUser(req.input.email, req.input.password);
            };
            if (cekUser) {
                return "Berhasil membuat akun";
            }
            
        }
        catch (error) {
            res.status(500).send(error.message);

        }
    }
};

module.exports = UserController;
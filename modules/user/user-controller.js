const UserController = {
    login: (req, res, next) => {
        console.log('req.body: ', req.body);
        res.send('OK');
    },
};

module.exports = UserController;
const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    //Used to create user
    app.post('/api/users/register', UserController.register);

    //Used to login user
    app.post('/api/users/login', UserController.login);

    //Userd to logout user
    app.post('/api/users/logout', UserController.logout);

    //Used to check if user is logged in
    app.get('/api/users', authenticate, UserController.getLoggedInUser);
}
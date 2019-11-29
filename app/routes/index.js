var Controllers = require("../controllers");

module.exports = function (app) {

    var user = Controllers.UserController;

    //userView FUNCTION  
    app.post('/userView', user.userView);


};
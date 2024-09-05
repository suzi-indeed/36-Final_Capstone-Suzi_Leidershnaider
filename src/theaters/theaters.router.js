const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here

//GET /theaters › should return a list of all theaters, including the 'movies' each theatre is showing
router.route("/")
    .get(controller.list)
    .options(controller.list)
    ;

module.exports = router;

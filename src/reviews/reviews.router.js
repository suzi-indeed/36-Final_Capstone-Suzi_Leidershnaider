const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:reviewId")
    .put(controller.update)
    .get(controller.update)
    .delete(controller.destroy)


router.route("/")
    .get(controller.list)
    .options(controller.list);



module.exports = router;

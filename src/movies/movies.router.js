const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);
router.get("/:movieId/critics", (req, res, next) =>  next({status:404, message:"critics not accessible"}));
router.get("/:movieId", controller.read);
router.get("/", controller.list);

module.exports = router;

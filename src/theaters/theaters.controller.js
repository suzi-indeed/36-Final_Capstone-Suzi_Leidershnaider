const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  ////GET /theaters › should return a list of all theaters, including the 'movies' each theatre is showing
  const movieId = request.params.movieId;
  const theaters = await service.list(movieId);
  response.json({data: theaters});
}

module.exports = {
  list: asyncErrorBoundary(list),
};

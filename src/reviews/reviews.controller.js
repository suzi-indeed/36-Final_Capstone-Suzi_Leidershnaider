const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const reviewId = request.params.reviewId;
  const review = await service.read(reviewId);
  if (review) {
    return next();
  }
  return next({status:404, message:"cannot be found"});
}

async function destroy(request, response) {
  // TODO: Write your code here
  const reviewId = request.params.reviewId;
  await service.destroy(reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const movieId = request.params.movieId;
  //console.log("got to here, movie id is: ",movieId);
  const reviews = await service.list(movieId);
  //console.log("got to here, movie id is: ",reviews);

  response.json({data: reviews});
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  //methodNotAllowed(request, response, next);
  next({status:404, message:"movie id not found"});
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  //console.log("got to update, request.body: ",request.body);
  const updatedReview = {
    ...request.body.data,
    review_id: request.params.reviewId,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

// async function read(request,response){
//   const reviews = await service.read(movieId);
//   if (!reviews){

//   }
// }

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [
    hasMovieIdInPath, 
    asyncErrorBoundary(list)
  ],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};

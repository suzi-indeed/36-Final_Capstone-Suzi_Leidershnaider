const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movieId = request.params.movieId;
  const movie = await service.read(movieId);
  //console.log("movie is: ",movie);

  if (movie){
    return next();
  }
  //expect(response.body.error).toBeDefined();
  next({status: 404, message: `movie ${movieId} id does not exist in the data base.` });
}

async function read(request, response) {
  // TODO: Add your code here
  let movie;
  try{
    //console.log("movie id is: ",request.params?.movieId);
    movie = await service.read(request.params.movieId);
    //console.log("movie is: ",movie);
  }
  catch(error){
    //console.log("error is: ",error);
  }
  response.json({ data: movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const isShowing = request.query.is_showing==="true";
  const movies = await service.list(isShowing);
  response.json({data: movies});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [
    asyncErrorBoundary(movieExists), 
    read],
};

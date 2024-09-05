const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName)
  .where({ review_id: reviewId })
  .del();
}

async function list(movieId) {
  // TODO: Write your code here
  const reviews = await db("reviews")
    .select("reviews.movie_id", "critics.critic_id", "critics.preferred_name", "critics.surname", "critics.organization_name", "reviews.content")
    .join(
      "critics",
      "reviews.critic_id",
      "critics.critic_id"
    )
    //if there's a movieId, filter by movieId
    .modify((query) => {
      if (movieId) {
        query.where({ "reviews.movie_id": movieId });
      }
    });
  //.join("movies", "movies.movie_id", "movies_theaters.movie_id")
  //.then(reduceMovies);

  return reviews.map(review => ({
    content: review.content,
    movie_id: review.movie_id,
    critic: {
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
    }
  }))
}

async function read(reviewId) {
  // TODO: Write your code here
  //look for reviewId in reviews
  const review = await db("reviews")
    .select("reviews.*")
    .where({ "reviews.review_id": reviewId })
  if (review) {
    return review[0];
  }
  //if review isn't found, should return 404
  return undefined;
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  await db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*");
    
  return await read(review.review_id)
    .then(setCritic);
  //.then(() => read(review.review_id))
  //.then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};

import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.js";

const router = express.Router();

router.route("/").get(getAllMovies).post(createMovie);
router.route("/:id").get(getMovieById).put(updateMovie).delete(deleteMovie);

export { router as moviesRouter };

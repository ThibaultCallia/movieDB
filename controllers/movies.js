import { Movie } from "../models/Movie.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

const getAllMovies = asyncWrapper(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json({ movies });
});

const getMovieById = asyncWrapper(async (req, res) => {
  const { id: movieID } = req.params;
  const foundMovie = await Movie.findOne({ _id: movieID });
  if (!foundMovie)
    return res
      .status(404)
      .json({ error: `Movie with id ${movieID} not found` });
  res.status(200).json({ foundMovie });
});

const createMovie = asyncWrapper(async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(200).json({ movie });
});

const updateMovie = asyncWrapper(async (req, res) => {
  const { id: movieId } = req.params;
  const foundMovie = await Movie.findOneAndUpdate({ _id: movieId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!foundMovie)
    return res
      .status(404)
      .json({ error: `Movie with id ${movieId} not found` });
  res.status(200).json({ foundMovie });
});

const deleteMovie = asyncWrapper(async (req, res) => {
  const { id: movieID } = req.params;
  const foundMovie = await Movie.findOneAndDelete({ _id: movieID });
  if (!foundMovie)
    return res
      .status(404)
      .json({ error: `Movie with id ${movieID} not found` });
  res.status(200).json({ foundMovie });
});

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };

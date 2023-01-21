import { Movie } from "../models/Movie.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import CustomError from "../errors/CustomError.js";

const getAllMovies = asyncWrapper(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json({ movies });
});

const getMovieById = asyncWrapper(async (req, res, next) => {
  const { id: movieId } = req.params;
  const foundMovie = await Movie.findOne({ _id: movieId });
  if (!foundMovie)
    return next(new CustomError(`Movie with id ${movieId} not found`, 404));

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
    return next(new CustomError(`Movie with id ${movieId} not found`, 404));

  res.status(200).json({ foundMovie });
});

const deleteMovie = asyncWrapper(async (req, res) => {
  const { id: movieId } = req.params;
  const foundMovie = await Movie.findOneAndDelete({ _id: movieId });
  if (!foundMovie)
    return next(new CustomError(`Movie with id ${movieId} not found`, 404));
  res.status(200).json({ foundMovie });
});

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };

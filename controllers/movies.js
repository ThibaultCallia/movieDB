import { Movie } from "../models/Movie.js";

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const foundMovie = await Movie.findOne({ _id: movieID });
    if (!foundMovie)
      return res
        .status(404)
        .json({ error: `Movie with id ${movieID} not found` });
    res.status(200).json({ foundMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const foundMovie = await Movie.findOneAndUpdate(
      { _id: movieId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!foundMovie)
      return res
        .status(404)
        .json({ error: `Movie with id ${movieId} not found` });
    res.status(200).json({ foundMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const foundMovie = await Movie.findOneAndDelete({ _id: movieID });
    if (!foundMovie)
      return res
        .status(404)
        .json({ error: `Movie with id ${movieID} not found` });
    res.status(200).json({ foundMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };

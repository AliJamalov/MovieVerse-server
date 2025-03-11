import Wishlist from "../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      const newWishlist = new Wishlist({
        userId,
        movies: [movieId], // инициализируем массив с первым фильмом
      });
      await newWishlist.save();

      return res.status(201).json(newWishlist);
    }

    // предотвращаем добавление дубликатов
    if (wishlist.movies.includes(movieId)) {
      return res.status(400).json({ message: "you already added this movie to wishlist" });
    }

    wishlist.movies.push(movieId);
    await wishlist.save();

    return res.status(201).json({ message: "Movie added to wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.find({ userId });

    if (wishlist.length === 0) {
      return res.status(404).json({ message: "Wishlist is empty" });
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMovieFromWishlist = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist not found" });
    }

    wishlist.movies = wishlist.movies.filter((item) => item).filter((item) => item.toString() !== id);

    await wishlist.save();

    return res.status(200).json({ message: "Movie removed from wishlist", wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

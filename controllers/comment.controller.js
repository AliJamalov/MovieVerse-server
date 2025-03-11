import Comment from "../models/comment.model.js";

export const getMovieComments = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ movieId: id });

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "Comments not found" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const { text, movieId } = req.body;
  const userId = req.user._id;

  try {
    const comment = new Comment({
      text,
      movieId,
      userId,
    });

    await comment.save();

    return res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const comment = await Comment.findOne({ _id: id, userId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or not authorized" });
    }

    await Comment.deleteOne({ _id: id });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  try {
    const comment = await Comment.findOne({ _id: id, userId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found or not authorized" });
    }

    comment.text = text || comment.text;

    await comment.save();

    return res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

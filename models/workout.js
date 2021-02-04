// defining and exporting the workout schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "workout type is required",
      },
      name: {
        type: String,
        required: "exercise name is required",
      },
      duration: {
        type: Number,
        required: "exercise duration is required",
      },
      weight: {
        type: Number,
      },
      reps: {
        Number,
      },
      sets: {
        Number,
      },
      distance: {
        Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

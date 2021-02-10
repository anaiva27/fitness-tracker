const Workout = require("../models/workout.js");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).then((workouts) => {
    res.json(workouts);
  });
});

//new workout
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//add excersise
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((workouts) => {
      res.json(workouts);
    });
});

module.exports = router;

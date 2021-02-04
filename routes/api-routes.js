const Workout = require("../models/workout.js");
const router = require("express").Router();
// /api/workouts

// api/workouts/" + id  --put

// api/workouts/range  -- post

// WTH is /exercise? route
// /exercise

//last workout
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addField: {
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

// router.post("/submit", ({ body }, res) => {
//   Note.create(body)
//     .then(({ _id }) => User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });
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
      $addField: {
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

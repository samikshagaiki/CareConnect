import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    xp: {
      type: Number,
      default: 2,
    },

    hint: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const DailyChallengeSchema =
  new mongoose.Schema(
    {
      game: {
        type: String,
        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      rewardXP: {
        type: Number,
        default: 20,
      },

      tasks:{
  type:Array,
  default:[]
},

cells:{
  type:Array,
  default:[]
},
    },
    {
      timestamps: true,
    }
  );

DailyChallengeSchema.index(
  {
    game: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default
  mongoose.models.DailyChallenge ||
  mongoose.model(
    "DailyChallenge",
    DailyChallengeSchema
  );
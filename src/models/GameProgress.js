import mongoose from "mongoose";

const GameHistorySchema =
  new mongoose.Schema(
    {
      completedTasks: {
        type: [Number],
        default: [],
      },

      completed: {
        type: Boolean,
        default: false,
      },

      earnedXP: {
        type: Number,
        default: 0,
      },

      completedAt: Date,
    },
    {
      _id: false,
    }
  );

const GameProgressSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
        unique: true,
      },

      xp: {
        type: Number,
        default: 0,
      },

      level: {
        type: Number,
        default: 1,
      },

      streak: {
        type: Number,
        default: 0,
      },

      longestStreak: {
        type: Number,
        default: 0,
      },

      lastPlayedDate: {
        type: String,
        default: "",
      },

      badges: [
        {
          id: String,
          title: String,
          icon: String,
          unlockedAt: Date,
        },
      ],

      nature: {
        type: Map,
        of: GameHistorySchema,
        default: {},
      },

      bingo:{

  completedDates:[
    String,
  ],

  checkedCells:{
    type:Map,
    of:[Number],
    default:{},
  },

  totalCompleted:{
    type:Number,
    default:0,
  },

},
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.GameProgress ||
mongoose.model(
  "GameProgress",
  GameProgressSchema
);
import mongoose from "mongoose";

const AppointmentSchema =
  new mongoose.Schema(
    {
      patientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      counselorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      appointmentDate: {
        type: Date,
        required: true,
      },

      reason: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      notes: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.Appointment ||
  mongoose.model(
    "Appointment",
    AppointmentSchema
  );
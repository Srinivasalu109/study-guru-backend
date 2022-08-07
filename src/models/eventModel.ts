import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventId: { type: String },
  eventName: { type: String, required: true },
  time: { type: String, required: true },
  universityName: { type: String, required: true },
  location: { type: String, required: true },
  branch: { type: String, required: true },
  registered: {
    type: [
      {
        regId: { type: String },
        Name: { type: String },
        email: { type: String },
      },
    ],
  },
});

var Event = mongoose.model("EventSchema", eventSchema);

export default Event;

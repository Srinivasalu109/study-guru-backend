"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
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
var Event = mongoose_1.default.model("EventSchema", eventSchema);
exports.default = Event;
//# sourceMappingURL=eventModel.js.map
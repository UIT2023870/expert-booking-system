const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    slots: [
        {
            type: String,
            required: true,
        },
    ],
});

const expertSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type: Number,
            required: true,
            min: 0,
        },

        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },

        bio: {
            type: String,
            default: "",
        },

        availableSlots: [slotSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Expert", expertSchema);
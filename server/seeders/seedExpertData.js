const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const connectDB = require("../config/db");
const Expert = require("../models/Expert");

const experts = [
    {
        name: "Rahul Sharma",
        category: "Career Guidance",
        experience: 5,
        rating: 4.8,
        bio: "Helps students with career planning and interview preparation.",
        availableSlots: [
            { date: "2026-05-10", slots: ["10:00 AM", "11:00 AM", "2:00 PM"] },
            { date: "2026-05-11", slots: ["10:00 AM", "3:00 PM"] },
        ],
    },
    {
        name: "Anjali Mehta",
        category: "Fitness",
        experience: 3,
        rating: 4.5,
        bio: "Certified fitness coach and nutrition advisor.",
        availableSlots: [
            { date: "2026-05-10", slots: ["9:00 AM", "12:00 PM"] },
            { date: "2026-05-12", slots: ["8:00 AM", "11:00 AM", "4:00 PM"] },
        ],
    },
    {
        name: "Priya Nair",
        category: "Mental Health",
        experience: 7,
        rating: 4.9,
        bio: "Licensed therapist specializing in anxiety, stress, and mindfulness.",
        availableSlots: [
            { date: "2026-05-10", slots: ["11:00 AM", "1:00 PM", "4:00 PM"] },
            { date: "2026-05-13", slots: ["10:00 AM", "2:00 PM"] },
        ],
    },
    {
        name: "Vikram Desai",
        category: "Career Guidance",
        experience: 10,
        rating: 4.7,
        bio: "Senior tech recruiter with experience at top MNCs. Specializes in resume building and mock interviews.",
        availableSlots: [
            { date: "2026-05-11", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
            { date: "2026-05-14", slots: ["10:00 AM", "1:00 PM"] },
        ],
    },
    {
        name: "Sneha Kulkarni",
        category: "Fitness",
        experience: 6,
        rating: 4.6,
        bio: "Yoga instructor and wellness coach helping clients build sustainable healthy habits.",
        availableSlots: [
            { date: "2026-05-10", slots: ["7:00 AM", "9:00 AM", "5:00 PM"] },
            { date: "2026-05-12", slots: ["7:00 AM", "6:00 PM"] },
        ],
    },
    {
        name: "Arjun Kapoor",
        category: "Mental Health",
        experience: 4,
        rating: 4.4,
        bio: "Counselor focused on work-life balance, burnout recovery, and career transitions.",
        availableSlots: [
            { date: "2026-05-11", slots: ["12:00 PM", "2:00 PM", "5:00 PM"] },
            { date: "2026-05-13", slots: ["11:00 AM", "3:00 PM"] },
        ],
    },
    {
        name: "Meera Joshi",
        category: "Career Guidance",
        experience: 8,
        rating: 4.9,
        bio: "Product manager turned career coach. Helps professionals transition into product and tech roles.",
        availableSlots: [
            { date: "2026-05-12", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
            { date: "2026-05-14", slots: ["9:00 AM", "2:00 PM"] },
        ],
    },
    {
        name: "Rohan Verma",
        category: "Fitness",
        experience: 2,
        rating: 4.3,
        bio: "Strength and conditioning coach. Helps beginners build a solid fitness foundation.",
        availableSlots: [
            { date: "2026-05-10", slots: ["6:00 AM", "8:00 AM", "6:00 PM"] },
            { date: "2026-05-13", slots: ["7:00 AM", "5:00 PM"] },
        ],
    },
];

const seedExperts = async () => {
    try {
        await connectDB();

        await Expert.deleteMany();

        await Expert.insertMany(experts);

        console.log("Expert data seeded successfully");

        process.exit();

    } catch (error) {
        console.log(error);

        process.exit(1);
    }
};

seedExperts();


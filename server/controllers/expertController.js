const Expert = require("../models/Expert");

const getExperts = async (req, res) => {
    try {
        // Query params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search || "";
        const category = req.query.category || "";

        // Skip calculation for pagination
        const skip = (page - 1) * limit;

        // Dynamic filter object
        let filter = {};

        // Search by name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            };
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Fetch experts
        const experts = await Expert.find(filter)
            .skip(skip)
            .limit(limit);

        // Total count
        const totalExperts = await Expert.countDocuments(filter);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalExperts / limit),
            totalExperts,
            experts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    // If expert not found
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found",
      });
    }

    res.status(200).json({
      success: true,
      expert,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    getExperts,
    getExpertById,
};
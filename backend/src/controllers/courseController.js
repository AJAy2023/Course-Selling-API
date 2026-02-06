const mongoose = require("mongoose");
const Course = require("../models/course");

const createCourse = async (req, res) => {
  try {
    const id = req.user._id;
    const { title, description, price, currency, } = req.body;
    if (!title || !description || !price || !currency) {
      return res.status(400).json({
        success: false,
        message: "Please add all the required fields"
      });
    }
    const findcourse = await Course.findOne({
      id,
      title,
      description
    });
    if (findcourse) {
      return res.status(200).json({
        success: true,
        message: "Same course available !! Again you  want to add ?"
      });
    }
    const newCourse = await Course.create({
      instructor: id,
      title,
      description,
      price,
      currency,
    })

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        title: newCourse.title,
        description: newCourse.description
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}


const getAllCourses = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    const MAX_LIMIT = 100;
    const MIN_LIMIT = 1;

    if (limit > MAX_LIMIT) limit = MAX_LIMIT;
    if (limit < MIN_LIMIT) limit = 10;
    if (page < 1) page = 1;

    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      Course.find()
        .populate("instructor", "username email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Course.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      meta: {
        totalCourses: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + courses.length < total,
        hasPrevPage: page > 1
      },
      data: courses
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};


const getBycourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const findcourse = await Course.findById(id).populate("instructor", "username");
    if (!findcourse) {
      return res.status(404).json({
        success: false,
        message: "Course  not  found"
      });
    }
    return res.status(200).json({
      success: true,
      message: 'course data  successfully featched',
      findcourse
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}


const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course id"
      });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }
    if (course.instructor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own course"
      });
    }

    const { title, description, price, currency } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { $set: { title, description, price, currency } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};



const deletecourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Please check the  id'
      });
    }
    const findCourse = await Course.findById(id);
    if (!findCourse) {
      return res.status(404).json({
        success: false,
        message: "Course  not  found"
      });
    }
    if (findCourse.instructor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "you dont have the access!"
      });
    }
    const course = await Course.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: course
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}


module.exports = {
  createCourse,
  getAllCourses,
  getBycourseId,
  updateCourse,
  deletecourse
};



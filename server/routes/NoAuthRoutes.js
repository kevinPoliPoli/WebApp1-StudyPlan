const express = require("express");
const db = require("../dao/DB");
const courses = require("../dao/courseDao");
const users = require("../dao/userDAO");
const courseApi = require("../api/courseApi")
const userApi = require("../api/userApi")

//routes definition
const planRouter = express.Router()

//dao instancies
const courseDaoInstance = new courses(db.db)
const userDaoInstance = new users(db.db)

//api instancies
const courseApiInstance = courseApi(courseDaoInstance)
const userApiInstance = userApi(userDaoInstance)

planRouter.get("/courses", courseApiInstance.getAllCourses)

module.exports = planRouter
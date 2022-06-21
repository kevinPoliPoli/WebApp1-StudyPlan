const express = require("express");
const db = require("../dao/DB");
const courses = require("../dao/courseDao");
const users = require("../dao/userDAO");
const userApi = require("../api/userApi")

//routes definition
const planRouter = express.Router()

//dao instancies
const courseDaoInstance = new courses(db.db)
const userDaoInstance = new users(db.db)

//api instancies
const userApiInstance = userApi(userDaoInstance, courseDaoInstance)

planRouter.get("/getprofile/:id", userApiInstance.getMyProfile)

planRouter.put("/commitPlan/:id", userApiInstance.commitPlan)
planRouter.put("/deleteCommittedPlan/:id", userApiInstance.deleteCommittedPlan)


module.exports = planRouter
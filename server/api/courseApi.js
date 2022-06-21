function courseApi(dao){

    const getAllCourses = async (req, res) => {
        await dao.getAllCourses().then((courses)=>{
            return res.status(200).json(courses)
        }).catch((err)=>{
            return res.status(503).json({err: err})
        })
    }

    return {
        getAllCourses: getAllCourses,
    }

}

module.exports = courseApi
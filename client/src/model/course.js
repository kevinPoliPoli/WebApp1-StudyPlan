function Course(code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse){
    this.code=code
    this.name=name
    this.credits=credits
    this.maxStudents=maxStudents
    this.enrolled=enrolled
    this.incompatibleWith=incompatibleWith
    this.preparatoryCourse=preparatoryCourse

    this.toSring = () => {
        return `code: ${this.code} - name: ${this.name} - credits: ${this.credits} - max students: ${this.maxStudents} - enrolled students: ${this.enrolled} - incompatible courses: ${this.incompatibleWith} - preparatory courses: ${this.preparatoryCourse} ` 
    }
}

export {Course}
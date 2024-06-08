import mongoose from "mongoose";

const {Schema , model } = mongoose

const internshipSchema = new Schema({
    title : "String",
    company_name : "String",
    company_url : "String",
    stipend :{
        salary: "String" ,
      tooltip: "String",
      salaryValue1: "Number",
      salaryValue2: "Number",
      salaryType: "String",
      currency: "String",
      scale: "String",
      large_stipend_text: "Boolean"
    },
    location_names: ["String"],
    duration: "String",
    start_date: "String"
})

let Internship = model('Internship', internshipSchema)

export default Internship
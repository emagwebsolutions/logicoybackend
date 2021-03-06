const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
    dcontact: {
        type: String,
        required: [true,"Driver name field required!"],
        minlength: 10
    },
    driver: {
        type: String,
        required: [true,"Client name field required!"]
    },
    license: {
        type: String
    },
    creatorid: String,
    createdby: String,
    creatorphone: String
},
{ timestamps: true },)

DriverSchema.methods.capitalize = function(){
    this.transporter = this.transporter.toUpperCase()
}

DriverSchema.methods.getid = function(){
    return this._id 
}

const drivers = mongoose.model('Drivers', DriverSchema)
module.exports = drivers
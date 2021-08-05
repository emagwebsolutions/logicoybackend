const mongoose = require('mongoose')

const TruckSchema = new mongoose.Schema({
    truckname: {
        type: String,
        required: [true,"Truck name field required!"]
    },
    tcontact: {
        type: String,
        required: [true,"Transporter contact field required!"]
    },
    transporter: {
        type: String,
        required: [true,"Transporter field required!"]
    },
    trucknumber: {
        type: String,
        required: [true,"Truck number field required!"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    creatorid: String,
    createdby: String,
    creatorphone: String
})

TruckSchema.methods.capitalize = function(){
    this.transporter = this.transporter.toUpperCase()
}

TruckSchema.methods.getid = function(){
    return this._id 
}

const Trucks = mongoose.model('Trucks', TruckSchema)
module.exports = Trucks
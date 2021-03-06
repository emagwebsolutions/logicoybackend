const Users = require('../model/Users')
const Drivers = require('../model/Drivers')
const Trucks = require('../model/Trucks')
const Transporters = require('../model/Transporters')
const Jobs = require('../model/Jobs')
const Fuelrates = require('../model/Fuelrates')
const Cargorates = require('../model/Cargorates')
const {check} = require('express-validator')

// isLength()
// isEmail()
// isMobilePhone()
// isNumeric()
// isAlpha()
// isAlphanumeric()
// isURL()
// contains()
// equals()
// isBoolean()
// isEmpty()
// isFQDN(), is a fully qualified domain name?
// isIn(), check if the value is in an array of allowed values
// isJSON()
// isLowercase()
// isUppercase()

// check('comment')
// .escape()
// .notEmpty()
// .withMessage('Comment required')
// .isLength({min: 3,max:280})       
// .withMessage('Comment must be between 3 and 280 characters')
// .matches(/^[A-Za-z0-9 .,'!&]+$/)


/*####################################
*BEGIN USERS REGISTRATION VALIDATION
####################################*/
exports.RegValidate = [

    //Fullname Validation
    check('fullname').custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
    }).trim().withMessage('Fullname must be a string!'),

    //Phone validation
    check('phone').trim().isMobilePhone().withMessage('Valid phone number required!'),

    //Check if phone exists
    check('phone').custom((val,{req})=>{
      return new Promise((resolve, reject) => {
          Users.findOne({phone: val}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('Phone already in use'))
            }
            resolve(true)
          });
      })
    }),

    //Email validation
    check('email').trim().isEmail().withMessage('Valid email required!'),

    //Check if email exists
    check('email').custom((val,{req})=>{
        return new Promise((resolve, reject) => {
            Users.findOne({email: val}, function(err, user){
              if(err) {
                reject(new Error('Server Error'))
              }
              if(Boolean(user)) {
                reject(new Error('E-mail already in use'))
              }
              resolve(true)
            });
        })
    }),

    //Password validation
    check('password').trim().isLength({min: 6}).withMessage('Password must be 6 characters long!'),

    //Hiredate validation
    check('hiredate').trim().isDate().withMessage('Hiredate required!'),

    //Residence validation
    check('residence').custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
    }).withMessage('Valid residence required!!'),

    //Role validation
    check('role').trim().isAlpha().withMessage('Select a role!'),

    //Check if Passwords match
    check('repassword').custom((val,{req})=>{
          return new Promise((resolve, reject) => {
                if(val !== req.body.password) {
                  reject(new Error('Passwords do not match!'))
                }
                else{
                  resolve(true)
                } 
          })
    })

]
/*####################################
*END USERS REGISTRATION VALIDATION
####################################*/






/*####################################
*BEGIN EDIT PASSWORD
####################################*/
exports.PassValidate = [

  //Password validation
  check('password').trim().isLength({min: 6}).withMessage('Password must be 6 characters long!'),

  //Check if Passwords match
  check('repassword').custom((val,{req})=>{
        return new Promise((resolve, reject) => {
              if(val !== req.body.password) {
                reject(new Error('Passwords do not match!'))
              }
              else{
                resolve(true)
              } 
        })
  })

]
/*####################################
*END EDIT PASSWORD
####################################*/
















/*####################################
*BEGIN EDIT USERS REGISTRATION VALIDATION
####################################*/
exports.EditRegValidate = [

  //Fullname Validation
  check('fullname').custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
  }).trim().withMessage('Fullname must be a string!'),

  //Phone validation
  check('phone').trim().isMobilePhone().withMessage('Valid phone number required!'),

  //Check if phone exists
  check('phone').custom((val,{req})=>{
    const cemail = req.body.email
    return new Promise((resolve, reject) => {
        Users.find({$and: [{phone: {$eq : val}},{email: {$ne: cemail}}]},
          function(err, user){
          
          if(err) {
            reject(new Error('Server Error'))
          }
          if(user.length > 0) {
            reject(new Error('Phone already in use'))
          }
          resolve(true)
        });
    })
  
  }),

  //Email validation
  check('email').trim().isEmail().withMessage('Valid email required!'),

  //Check if email exists
  check('email').custom((val,{req})=>{
      return new Promise((resolve, reject) => {
          Users.find({$and : [{email: {$eq : val}},{phone: {$ne : req.body.phone}}]}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(user.length > 0) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
      })
  }),

  //Password validation

 
 
  //Hiredate validation
  //check('hiredate').trim().isDate().withMessage('Hiredate required!'),

  //Residence validation
  check('residence').custom((value) => {
      return value.match(/^[A-Za-z ]+$/);
  }).withMessage('Valid residence required!!'),

  //Role validation
  check('role').trim().isAlpha().withMessage('Select a role!')

]
/*####################################
*END EDIT USERS REGISTRATION VALIDATION
####################################*/

/*####################################
*BEGIN LOGIN VALIDATION
####################################*/
exports.LoginValidate = [
    check('email').trim().isEmail().withMessage("Valid email required!")
]
/*####################################
*END LOGIN VALIDATION
####################################*/


/*####################################
*BEGIN DRIVERS REGISTRATION VALIDATION
####################################*/
exports.DriversValidate = [

  //Driver Validation
  check('driver')
  .escape()
  .notEmpty()
  .withMessage('Driver field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Dcontact validation
  check('dcontact')
  .notEmpty()
  .withMessage('Driver contact field required!')
  .isMobilePhone()
  .withMessage('Valid contact number required!'),
  
  //Check if phone exists
  check('dcontact').custom((val,{req})=>{
    return new Promise((resolve, reject) => {
        Drivers.findOne({dcontact: val}, function(err, user){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(user)) {
            reject(new Error('Driver contact already in use'))
          }
          resolve(true)
        });
    })
  })
]
/*####################################
*END USERS REGISTRATION VALIDATION
####################################*/


/*####################################
*BEGIN EDIT DRIVERS REGISTRATION VALIDATION
####################################*/
exports.EditDriversValidate = [

  //Driver Validation
  check('driver')
  .escape()
  .notEmpty()
  .withMessage('Driver field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Dcontact validation
  check('dcontact')
  .notEmpty()
  .withMessage('Driver contact field required!')
  .isMobilePhone()
  .withMessage('Valid contact number required!'),

  //Check if phone exists
  check('dcontact').custom((val,{req})=>{
    const id = req.body.id
    return new Promise((resolve, reject) => {
    Drivers.find({$and: [{dcontact: {$eq : val}},{_id: {$ne: id}}]},
          function(err,driv){
          
          if(err) {
            reject(new Error('Server Error'))
          }
          if(driv.length > 0) {
            reject(new Error('Contact already in use'))
          }
          resolve(true)
        });
    })

  })

]
/*####################################
*END EDIT DRIVERS REGISTRATION VALIDATION
####################################*/



/*####################################
*BEGIN TRUCKS REGISTRATION VALIDATION
####################################*/
exports.TrucksValidate = [

    //Dcontact validation
    check('tcontact')
    .notEmpty()
    .withMessage('Transporter contact field required!')
    .isMobilePhone()
    .withMessage('Valid contact number required!'),
  

  //Role validation
  check('transporter')
  .escape()
  .notEmpty()
  .withMessage('Transporter field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  

  //Residence validation
  check('trucknumber')
  .escape()
  .notEmpty()
  .withMessage('Truck number field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

    //Check if phone exists
    check('trucknumber').custom((val,{req})=>{
      return new Promise((resolve, reject) => {
        Trucks.findOne({trucknumber: val}, function(err, res){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(res)) {
              reject(new Error('Truck Number already in use'))
            }
            resolve(true)
          });
      })
    })

]
/*####################################
*END TRUCKS REGISTRATION VALIDATION
####################################*/



/*####################################
*BEGIN EDIT TRUCKS REGISTRATION VALIDATION
####################################*/
exports.EditTrucksValidate = [
  
  //Dcontact validation
  check('tcontact')
  .notEmpty()
  .withMessage('Transporter contact field required!')
  .isMobilePhone()
  .withMessage('Valid contact number required!'),



  //Role validation
  check('transporter')
  .escape()
  .notEmpty()
  .withMessage('Transporter field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  

  //Residence validation
  check('trucknumber')
  .escape()
  .notEmpty()
  .withMessage('Truck number field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),


    //Check if phone exists
    check('trucknumber').custom((val,{req})=>{
      const id = req.body.id
      return new Promise((resolve, reject) => {
        Trucks.find({$and: [{trucknumber: {$eq : val}},{_id: {$ne: id}}]},
            function(err,driv){
            
            if(err) {
              reject(new Error('Server Error'))
            }
            if(driv.length > 0) {
              reject(new Error('Truck Number already in use'))
            }
            resolve(true)
          });
      })
  
    })

]
/*####################################
*END EDIT TRUCKS REGISTRATION VALIDATION
####################################*/












































/*####################################
*BEGIN TRANSPORTERS VALIDATION
####################################*/
exports.TransValidate = [

  //Driver Validation
  check('transporter')
  .escape()
  .notEmpty()
  .withMessage('Transporter field required!')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),


  //Dcontact validation
  check('tcontact')
  .notEmpty()
  .withMessage('Contact number one field required!')
  .isMobilePhone()
  .withMessage('Valid contact number one required!'),
  
  //Check if phone exists
  check('tcontact').custom((val,{req})=>{
    return new Promise((resolve, reject) => {
        Transporters.findOne({tcontact: val}, function(err, res){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(res)) {
            reject(new Error('Contact one already in use'))
          }
          resolve(true)
        });
    })
  })

]
/*####################################
*END TRANSPORTERS VALIDATION
####################################*/



/*####################################
*BEGIN EDIT TRANSPORTERS VALIDATION
####################################*/
exports.EditTransValidate = [

  //Driver Validation
  check('transporter')
  .escape()
  .notEmpty()
  .withMessage('Transporter field required!')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Dcontact validation
  check('tcontact')
  .notEmpty()
  .withMessage('Contact field required!')
  .isMobilePhone()
  .withMessage('Valid contact number one required!'),

  //Check if phone exists
  check('tcontact').custom((val,{req})=>{
    const id = req.body.id
    return new Promise((resolve, reject) => {
    Transporters.find({$and: [{tcontact: {$eq : val}},{_id: {$ne: id}}]},
          function(err,trans){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(trans.length > 0) {
            reject(new Error('Contact number one already in use'))
          }
          resolve(true)
        });
    })

  })
]
/*####################################
*END EDIT  TRANSPORTERS VALIDATION
####################################*/


/*####################################
*BEGIN JOBS VALIDATION
####################################*/
exports.JobsValidate = [

  //Fullname Validation
  check('fullname')
  .escape()
  .notEmpty()
  .withMessage('Owner field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Transporter Validation
  check('transporter')
  .escape()
  .notEmpty()
  .withMessage('Transporter field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Transporter contact validation
  check('tcontact')
  .notEmpty()
  .withMessage('Transporter contact field required!')
  .isMobilePhone()
  .withMessage('Valid transporter contact number required!'),

  //Bags Validation
  check('bags')
  .escape()
  .notEmpty()
  .withMessage('Load field required!')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Destination Validation
  check('destination')
  .escape()
  .notEmpty()
  .withMessage('Destination field required!')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Residence validation
 check('trucknumber')
 .escape()
 .notEmpty()
 .withMessage('Truck number field required')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Driver Validation
  check('driver')
  .escape()
  .notEmpty()
  .withMessage('Driver field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Dcontact validation
  check('dcontact')
  .notEmpty()
  .withMessage('Driver contact field required!')
  .isMobilePhone()
  .withMessage('Valid contact number required!'),


  //Date validation
  check('date')
  .notEmpty()
  .withMessage('Date field required')
  .isDate()
  .withMessage('Valid date required!'),

]
/*####################################
*END JOBS VALIDATION
####################################*/



/*####################################
*BEGIN EDIT JOBS REGISTRATION VALIDATION
####################################*/
exports.EditJobsValidate = [
 //Fullname Validation
 check('fullname')
 .escape()
 .notEmpty()
 .withMessage('Owner field required')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Transporter Validation
 check('transporter')
 .escape()
 .notEmpty()
 .withMessage('Transporter field required')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Transporter contact validation
 check('tcontact')
 .notEmpty()
 .withMessage('Transporter contact field required!')
 .isMobilePhone()
 .withMessage('Valid transporter contact number required!'),


 //Bags Validation
 check('bags')
 .escape()
 .notEmpty()
 .withMessage('Load field required!')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Destination Validation
 check('destination')
 .escape()
 .notEmpty()
 .withMessage('Destination field required!')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

//Residence validation
check('trucknumber')
.escape()
.notEmpty()
.withMessage('Truck number field required')
.matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Driver Validation
 check('driver')
 .escape()
 .notEmpty()
 .withMessage('Driver field required')
 .matches(/^[A-Za-z0-9 .,'!&-]+$/),

 //Dcontact validation
 check('dcontact')
 .notEmpty()
 .withMessage('Driver contact field required!')
 .isMobilePhone()
 .withMessage('Valid contact number required!'),

 //Date validation
 check('date')
 .notEmpty()
 .withMessage('Date field required'),

]
/*####################################
*END EDIT JOBS REGISTRATION VALIDATION
####################################*/








/*####################################
*BEGIN FUEL RATES VALIDATION
####################################*/
exports.FuelValidate = [

  //Fuel litres validation
  check('litre')
  .notEmpty()
  .withMessage('Litres field required!')
  .isNumeric()
  .withMessage('Valid litre required!'),

    //Fuel Validation
    check('fuelstation')
    .escape()
    .notEmpty()
    .withMessage('Fuel station field required')
    .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  

  //Fuel station validation
  check('fuelstation').custom((fuelstation,{req})=>{
    return new Promise((resolve, reject) => {
      Fuelrates.findOne({fuelstation}, function(err, res){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(res)) {
            reject(new Error('Fuel station already exist!'))
          }
          resolve(true)
        });
    })
}),
  //Rate validation
  check('rate')
  .notEmpty()
  .withMessage('Rate field required!')
  .isNumeric()
  .withMessage('Valid rate field required!')

]
/*####################################
*END FUEL RATES VALIDATION
####################################*/



/*####################################
*BEGIN EDIT FUEL VALIDATION
####################################*/
exports.EditFuelValidate = [

  //Fuel litres validation
  check('litre')
  .notEmpty()
  .withMessage('Litres field required!')
  .isNumeric()
  .withMessage('Valid litre required!'),

  //Fuel Validation
  check('fuelstation')
  .escape()
  .notEmpty()
  .withMessage('Fuel station field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),

  //Fuel station validation
  check('fuelstation').custom((val,{req})=>{
    return new Promise((resolve, reject) => {
      Fuelrates.find({$and: [{fuelstation: {$eq : val}},{_id: {$ne: req.body.id}}]}, function(err, res){
          if(err) {
            reject(new Error('Server Error'))
          }
          if(res.length > 0) {
            reject(new Error('Fuel station already exist!'))
          }
          resolve(true)
        });
    })
}),
  //Rate validation
  check('rate')
  .notEmpty()
  .withMessage('Rate field required!')
  .isNumeric()
  .withMessage('Valid rate field required!')
 
 ]
 /*####################################
 *END EDIT FUEL VALIDATION
 ####################################*/


/*####################################
*BEGIN CARGOR VALIDATION
####################################*/
exports.CargoValidate = [

  //Fullname Validation
  check('owner')
  .escape()
  .notEmpty()
  .withMessage('Cargo owner field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),


  //Type Validation
  check('type')
  .escape()
  .notEmpty()
  .withMessage('Type field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),


  //Destination Validation
  check('destination')
  .escape()
  .notEmpty()
  .withMessage('Destination field required')
  .matches(/^[A-Za-z0-9 .,'!&-]+$/),


  //Destination Validation
  check('destination').custom((val,{req})=>{
    return new Promise((resolve, reject) => {
      Cargorates.findOne({$and: [{destination: val},{owner: req.body.owner}]}, function(err, res){ 
          if(err) {
            reject(new Error('Server Error'))
          }
          if(Boolean(res)) {
            reject(new Error('Destination already exist!'))
          }
          resolve(true)
        });
    })
}),

  
  //Rate validation
  check('rate')
  .notEmpty()
  .withMessage('Rate field required!')
  .isNumeric()
  .withMessage('Valid rate field required!')

]
/*####################################
*END CARGO VALIDATION
####################################*/



/*####################################
*BEGIN EDIT CARGOR VALIDATION
####################################*/
exports.EditCargoValidate = [
    //Fullname Validation
    check('owner')
    .escape()
    .notEmpty()
    .withMessage('Cargo owner field required')
    .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  
  
    //Type Validation
    check('type')
    .escape()
    .notEmpty()
    .withMessage('Type field required')
    .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  

    //Destination Validation
    check('destination')
    .escape()
    .notEmpty()
    .withMessage('Destination field required')
    .matches(/^[A-Za-z0-9 .,'!&-]+$/),
  
    
    //Transporter contact validation
    check('rate')
    .notEmpty()
    .withMessage('Rate field required!')
    .isNumeric()
    .withMessage('Valid rate field required!')
 
 ]
 /*####################################
 *END EDIT CARGO VALIDATION
 ####################################*/










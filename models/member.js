const mongoose = require('mongoose')
const Schema = mongoose.Schema
const memberSchema = new Schema({
  name: String,
  address: String,
  zipcode: String,
  email: {
    type: String,
    validate: [{
      validator: function (value) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value)
      },
      message: `invalid email format`
    }, {
      validator: function (value) {
        return mongoose.model('Member', memberSchema).findOne({
            _id: {
              $ne: this._id
            },
            email: value
          })
          .then(found => {
            if (found) {
              return false
            }
          })
      },
      message: `email already registered`
    }]
  },
  phone: {
    type: String,
      validate : {
        validator: function(value) {
          if(value.length <= 11 || value.length >= 13) return false 
        }, 
        message : `minimum length is 11 and maximum length is 13`
      }
  }
})


const member = mongoose.model('Member', memberSchema)
module.exports = member
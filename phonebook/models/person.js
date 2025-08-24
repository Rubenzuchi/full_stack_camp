const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return typeof v === 'string' && v.trim().length >= 3
      },
      message: props => `${props.value} does not have the minimum length (3)`
    }
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        if (!v) return false
        const regex = /^\d{2,3}-\d+$/
        return regex.test(v) && v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number. It must have the format XX-YYYY... or XXX-YYYY... and be at least 8 characters long.`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
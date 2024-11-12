import mongoose from 'mongoose'

mongoose.connect( process.env.BD_ACCESS, {
    
})
    .then(db => console.log('Database alive!'))
    .catch(err => console.log(err))
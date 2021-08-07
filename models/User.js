const { Schema, model, Types } =require('mongoose')

const schema = new Schema({
email: {type: String, reqired: true, unique: true},
password: {type: String, reqired: true},
links: [{type: Types.ObjectId, ref: 'Link'}]

})

module.exports =model('User', schema)
const {Router} = require('express')
const config =require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register', 
    [
        check('email','Invalid email').isEmail(),
        check('password', 'Minimum length of password 6 characters').isLength({ min: 5 })
    ],
    async (req, res)=> {
try {    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect input parameters while registration'
        })
    }
    const {email, password} =req.body
    
    console.log("Body", email, password )
    
    const candidate = await User.findOne({email})

    if (candidate) {
        return res.status(400).json({message: 'User with this email already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password:hashedPassword})
    console.log("Save user", user )
    await user.save()
    console.log("User saved successfully")

    res.status(201).json({message: 'User successfully created'})

} catch (e) {
    res.status(500).json({ message:"Something went wrong !" })
} 
})

// /api/auth/login 
router.post(
  '/login',
[
    check('email','Invalid email.Please check email format').normalizeEmail().isEmail(),
    check('password', 'Minimum length of password 6 characters').exists()
],
async (req, res)=> {
try {
const errors = validationResult(req)
if (!errors.isEmpty()) {
    return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect input parameters while login'
    })
}
const {email, password} =req.body

const user = await User.findOne({email})
console.log("User found ", user)
if (!user) {
   return res.status(400).json({message: 'User not found'})
}

const isMatch = await bcrypt.compare(password, user.password)
console.log("Pass match ", isMatch)

if (!isMatch) {
    return res.status(400).json({message: 'User and password do not match'})
 }
 const token = jwt.sign(
     {userId: user.id},
     config.get('jwtSecret'),
     {expiresIn: '1h'}
 )
  res.json({token, userId: user.id})
  console.log('Token', token)
    res.status(200),json({message: 'User successfully login'})

} catch (e) {
    res.status(500).json({ message:"Something went wrong !" })
} 
})

module.exports =router
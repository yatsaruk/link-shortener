const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) =>{
    if (req.method ==='OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        console.log('Middleware ', token)

        if (!token) {
           return res.status(401).json({message:'Not authorized'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded

        console.log('Middleware: decoded', decoded)
        
        next()

    } catch (e) {
        return res.status(401).json({message:'Not authorized'})
    }

}
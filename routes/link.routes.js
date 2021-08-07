const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid= require('shortid')
const config = require('config')
const router = Router()

router.post('/generate', auth, async (req, res) => {
try {
    console.log("Starting link.router generate()")
    const baseUrl = config.get('baseURL')
    const {from} = req.body
    
    console.log("Link routes: req.BEFORE genration", req)

    const code = shortid.generate()
    const existing = await Link.findOne({from})
    console.log("Link routes: req", req)
    
    if (existing) {
        return res.json({ link: existing })
    }
    const to = baseUrl + '/t/' + code
    console.log("Link routes: userId", req.user.userId )
    const link = new Link({
        code, to, from, owner: req.user.userId
    })

    await link.save()
    res.status(201).json({ link })

} catch (e) {
    res.status(500).json({ message:"Something went wrong !" })
} 

})

router.get('/', auth, async (req, res) => {

    try {
        console.log('request to Links / recieved', req )
        const links = await Link.find({ owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({ message:"Something went wrong !" })
    } 

})

router.get('/:id', auth, async (req, res) => {
try {
    const link = await Link.findById(req.params.id)
    res.json(link)
} catch (e) {
    res.status(500).json({ message:"Something went wrong !" })
} 
    

})

module.exports = router
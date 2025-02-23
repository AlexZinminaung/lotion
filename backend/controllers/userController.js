const handler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const transporter = require('../mails/sendVerifyMail')
const jwt =  require('jsonwebtoken')

const register = handler(async (req, res) => {
    
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const existUser = await User.findOne({ email })
    if (existUser && existUser.verified) {
        res.status(400)
        throw new Error('User already exist')
    }

    // if user exist but not verified, send verification email
    
    if (existUser && !existUser.verified)
    {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        existUser.password = hashedPassword
        await existUser.save()
        
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_VERIFY_SECRET, { expiresIn: '5min' })
        const verifyUrl = `http://localhost:5000/api/users/verify/${token}`
        try {
            await transporter.sendMail({
                from: "Email verification",
                to: existUser.email,
                subject: "Email verification",
                html: `<h1>Verify your Email </h1> <br> <p>Click <a href=${verifyUrl}>here</a> to verify your email</p>`
            })
            }

        catch (error) {
            console.log('Error sending verification ' ,error)
        }
        
        return res.status(200).json({ message: 'verification email sent for existed user'})
        
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashedPassword })

    // user created and send verification email
    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_VERIFY_SECRET, { expiresIn: '5min' })
        const verifyUrl = `http://localhost:5000/api/users/verify/${token}`
        await transporter.sendMail({
            from: "<lonewolf200311@gmail.com>",
            to: user.email,
            subject: "Email verification",
            html: `<h1>Verify your Email </h1> <br> <p>Click <a href=${verifyUrl}>here</a> to verify your email</p>`
        })
        }
    catch (error) {
        console.log('Error sending verification ' ,error)
    }
    
    return res.status(201).json({ message: 'User created and verification email sent'})
    
})


const login = handler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const user = await User.findOne({email})

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    
    if (!user.verified) {
        res.status(400)
        throw new Error('Please verify your email')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return res.status(200).json({ id: user._id, name: user.name, email: user.email, token: token })

})

const profile = handler(async (req, res) => {

    res.status(200).json(req.user)

})


const verify = handler(async (req, res) => {
    const { token } = req.params
    if (!token) {
        res.status(400)
        throw new Error('Invalid token')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }

        await user.verifyEmail()
        return res.status(200).json({ message: 'Email verified' })
    }

    catch (error)
    {
        console.log('Error verifying email', error)
        return res.status(400).json({ message: 'Invalid token or expired You might need to register again.' })
    }

})

module.exports = { register, login, profile, verify}



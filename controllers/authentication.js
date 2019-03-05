const User = require('../models/user')

exports.signup = function (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    //  See if the user with the given email exist
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err) }

        //  If user with email does exist, throw an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email in use' })
        }

        //  If user with email does not exist, create user and save record
        const user = new User({
            email: email,
            password: password
        })

        user.save(function (err) {
            if (err) { return next(err) }

            //  Respond to request indicating the user was created
            res.json(user)
        })
    })




}
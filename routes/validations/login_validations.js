const { body, validationResult, query, check } = require('express-validator');

exports.validateLoginUser=[


  body('email','Please enter the email').notEmpty(),body('email','Please enter a valid email').isEmail(),body('password','Please enter the password').notEmpty(),body('password','Password length should be minimum 6 characters').isLength({min:6,max:100}), (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({errors: errors.array()[0]});
        next();
      },
]


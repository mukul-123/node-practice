const { body, validationResult, query, check } = require('express-validator');

exports.validateSignUpUser=[

    body('name','Please enter the name').notEmpty(),body('email','Please enter the email').notEmpty(),body('email','Please enter a valid email').isEmail(),body('password','Please enter the password').notEmpty(),body('password','Password length should be minimum 6 characters').isLength({min:6,max:100}),body('confirm_password','Please confirm the password').notEmpty(),(req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({errors: errors.array()});

          if(req.body.password!=req.body.confirm_password)
            return res.status(400).json({"errors":[{"msg":"Password and Confirm password should be same",param:"confirm_password",location:"body"}]});

        next();
      }
]
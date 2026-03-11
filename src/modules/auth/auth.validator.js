const Joi =require('joi');

const contact= Joi.object({

    username: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Name must min 3 char and max 15 char',
        'any.required': 'Name is required'
    }),
    phonenumber:Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base':'Phone number must be exactly 10 digits'
    }),
    email:Joi.string().email({ tlds: { allow: true } }).lowercase().trim().max(50).messages({
        'string.email':'Invalid email address'
    })
}).xor('phonenumber', 'email').messages({
    'object.missing':'Either phone number or email is required'
})

module.exports=contact
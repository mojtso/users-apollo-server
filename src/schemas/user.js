import Joi from 'joi';

export default Joi.object().keys({
   email: Joi.string().email().required().label('Email'),
   username: Joi.string().alphanum().alphanum().min(4).max(30).required().label('Username'),
   name: Joi.string().max(256).required().label('Name'),
   password: Joi.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).label('Password')
    .options({
        language: {
            string: {
                regex: {
                    base: 'must have at least one lowercase letterm one uppercase letter, one digit and one special character'
                }
            }
        }
    }),
});
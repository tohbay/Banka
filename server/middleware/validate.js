import Joi from 'joi';

const validate = {
  signup(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      firstName: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      lastName: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      confirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  signin(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  createAccount(body) {
    const schema = Joi.object().keys({
      type: Joi.string().valid('savings', 'current').required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  patchAccount(body) {
    const schema = Joi.object().keys({
      status: Joi.string().valid('active', 'dormant').required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  creditAccount(body) {
    const schema = Joi.object().keys({
      amount: Joi.number().precision(2).required(),
      cashier: Joi.number().integer().positive().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  debitAccount(body) {
    const schema = Joi.object().keys({
      amount: Joi.number().precision(2).required(),
      cashier: Joi.number().integer().positive().required(),
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

};

export default validate;

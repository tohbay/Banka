import { customMiddleware } from 'valid_me_js';

const accountNumberValidate = (req, res, next) => {
  const valid = customMiddleware(req, res, next);

  valid
    .hasElement('accountNumber')
    .check();
};

export default { accountNumberValidate };

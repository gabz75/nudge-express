import * as yup from 'yup';

import Response from '~/services/response';
import withValidations from '~/services/with-validations';

const validationSchema = yup.object().shape({
  number: yup.number().min(1).max(5).required(),
});

let parent;
let context;
let info;

const callback = (parent, args) => args.number + 1;
const callbackWrappedWithValidations = withValidations(callback, validationSchema);

describe('withValidations', () => {
  it('validates arguments with a validation schema', async () => {
    expect(callbackWrappedWithValidations).toBeType('function');

    const args = { number: 1 };
    const response = await callbackWrappedWithValidations(parent, args, context, info);

    expect(response).toBe(2);
  });

  it('returns a `failure` Response when failing validations', async () => {
    expect(callbackWrappedWithValidations).toBeType('function');

    const args = { number: 0 };
    const response = await callbackWrappedWithValidations(parent, args, context, info);

    expect(response).toBeInstanceOf(Response);
    expect(response.success).toStrictEqual(false);
    expect(response.errors).toContain('number must be greater than or equal to 1');
  });
});

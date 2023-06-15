import schema from './schema';

const userBodyLoginValidate = (body: object) => {
  const { error } = schema.userBodyLoginSchema.validate(body);
  if (error) {
    return { type: 'ERROR', message: error.message };
  }

  return { type: undefined };
};

const matcheBodyUpdateInProgressValidate = (body: object) => {
  const { error } = schema.matcheBodyUpdateInProgressSchema.validate(body);
  if (error) {
    return { type: 'ERROR', message: error.message };
  }

  return { type: undefined };
};

const matcheBodyUpdateValidate = (body: object) => {
  const { error } = schema.matcheBodyUpdateSchema.validate(body);
  if (error) {
    return { type: 'ERROR', message: error.message };
  }

  return { type: undefined };
};

export default {
  userBodyLoginValidate,
  matcheBodyUpdateInProgressValidate,
  matcheBodyUpdateValidate,
};

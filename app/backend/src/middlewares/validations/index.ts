import schema from './schema';

const userBodyLoginValidate = (body: object) => {
  const { error } = schema.userBodyLoginSchema.validate(body);
  if (error) {
    return { type: 'ERROR', message: error.message };
  }

  return { type: undefined };
};

export default {
  userBodyLoginValidate,
};

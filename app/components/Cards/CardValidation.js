import Error from 'UI/Error';

const validateFields = (targetFields) => {
  if (targetFields && targetFields.title) {
    if (targetFields.title.length > 20) {
      return Error.throwError('Title can only have 20 characters');
    }
    if (!targetFields.text) {
      return Error.throwError('Your card cannot be empty');
    }
  } else {
    return Error.throwError('Title is required');
  }
  return true;
};

export default validateFields;

import jsonschema from 'jsonschema';
import taskDefinition from './taskDefinition.json';


const Validator = jsonschema.Validator;
const v = new Validator();

export default function validateTask(task) {
  const validation = v.validate(task, taskDefinition);
  const errors = validation.errors;
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i += 1) {
      console.warn('Error in task validation', errors[i]); // eslint-disable-line no-console
    }
    return false;
  }
  return true;
}

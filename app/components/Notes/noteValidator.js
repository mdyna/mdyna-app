import jsonschema from 'jsonschema';
import noteDefinition from './noteDefinition.json';

const Validator = jsonschema.Validator;
const v = new Validator();

export default function validateNote(note) {
  const validation = v.validate(note, noteDefinition);
  const errors = validation.errors;
  if (errors.length > 0) {
    for (let i = 0; i < errors.length; i += 1) {
      console.warn('Error in note validation', errors[i]); // eslint-disable-line no-console
    }
    return false;
  }
  return true;
}

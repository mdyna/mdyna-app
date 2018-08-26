import _ from 'lodash';
import ACTION_TYPES from '../actions/actionTypes';

const { ADD_LABEL, REMOVE_LABEL } = ACTION_TYPES.LABEL;
export default function labels(state = [], action) {
  switch (action.type) {
    case ADD_LABEL:
      return state.map(d => d.title).indexOf(action.label.title) === -1
        ? [
          ...state,
          {
            title: action.label.title,
            count: 1,
          },
        ]
        : state.map((label) => {
          if (label.title === action.label.title) {
            return {
              ...label,
              count: label.count + 1,
            };
          }
          return label;
        });
    case REMOVE_LABEL:
      return state
        .filter(
          d => d.title !== action.label.title || (d.title === action.label.title && d.count > 1),
        )
        .map((label) => {
          if (label.title === action.label.title) {
            return {
              ...label,
              count: label.count - 1,
            };
          }
          return label;
        });
    default:
      return state;
  }
}

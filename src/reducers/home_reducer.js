import { TEST } from '../actions/types';

const INITIAL_STATE = {};

export const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST:
      return state;
    default:
      return state;
  }
};

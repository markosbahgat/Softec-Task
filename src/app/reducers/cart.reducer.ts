import { Action } from '@ngrx/store';

export const cartReducer = (state: any, action: Action) => {
  console.log(state, action.type);
  switch (action.type) {
    case 'Hello':
      break;

    default:
      break;
  }
};

export const CreateReducer = (initialState: any, handlers: any) => {
  return function reducer(state = initialState, action: any) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

import { createStore } from "redux";

// previous state and action for the arguments
// Based on the action type, return a new state snapshot
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return { counter: state.counter + 1 };
  }
  if (action.type === "decrement") {
    return { counter: state.counter - 1 };
  }

  return state;
};

// Create the redux store, reducer must be the argument in the createStore function
const store = createStore(counterReducer);

//provide the redux store to the app component
export default store;

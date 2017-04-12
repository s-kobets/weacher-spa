// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { createStore } from 'redux';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

function reducer(state = { cities: [] }, action) {
  switch (action.type) {
    case 'ADD_CITY':
      return { cities: state.cities.concat(action.amount) }
    case 'REMOVE_CITY':
      return { cities: state.cities.filter(city => {
        return city.id !== action.amount.id;
      })}
    default:
      return state;
  }
}

// const cityStore = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, persistedState)));
const cityStore = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

cityStore.subscribe(() => {
  saveState(cityStore.getState());
});

export default cityStore;
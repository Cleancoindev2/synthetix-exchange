import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../ducks';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)(createStore);
export default finalCreateStore(reducers);

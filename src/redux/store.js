import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import pokeReducer from "./pokeDucks"; // Se importa el reducer del ducks

// Se combinan todos los Ducks que tengamos
const rootReducer = combineReducers({
  pokemones: pokeReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Configuracion para usar la extencion de redux_devtools en el navegador

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}

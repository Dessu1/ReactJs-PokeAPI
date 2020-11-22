import React from "react";
import Pokemones from "./components/Pokemones";

import { Provider } from "react-redux"; // Permite que todos los componentes puedan acceder al store
import generateStore from "./redux/store"; // nuestra store con todos los ducks

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Pokemones />
    </Provider>
  );
}

export default App;

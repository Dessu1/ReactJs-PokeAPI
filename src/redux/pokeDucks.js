import axios from "axios";

// CONSTANTES
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

// types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO";
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO";
const ANTERIOR_POKEMONES_EXITO = "ANTERIOR_POKEMONES_EXITO";
const INFO_POKEMON_EXITO = "INFO_POKEMON_EXITO";

// REDUCER
export default function pokeReducer(state = dataInicial, accion) {
  switch (accion.type) {
    case OBTENER_POKEMONES_EXITO:
      return { ...state, ...accion.payload };
    case SIGUIENTE_POKEMONES_EXITO:
      return {
        ...state,
        ...accion.payload,
      };
    case ANTERIOR_POKEMONES_EXITO:
      return { ...state, ...accion.payload };
    case INFO_POKEMON_EXITO:
      return { ...state, detallePoke: accion.payload };
    default:
      return state;
  }
}

// ACCIONES
export const obtenerPokemones = () => async (dispatch) => {
  /**
   * getState() devulve el store el cual contiene el state del duck
   */
  //const { offset } = getState().pokemones; // obtenemos a la propiedad offset de getState().pokemones

  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
    );

    dispatch({
      type: OBTENER_POKEMONES_EXITO,
      payload: res.data,
    });

    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const siguientesPokemones = () => async (dispatch, getState) => {
  /**
   * getState() devulve el store el cual contiene el state del duck
   */
  //const { offset } = getState().pokemones; // obtenemos a la propiedad offset de getState().pokemones
  //const siguiente = offset + num;

  const { next } = getState().pokemones; // obtenemos a la propiedad next de getState().pokemones

  if (localStorage.getItem(next)) {
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(next)),
    });

    return;
  }

  try {
    const res = await axios.get(next);

    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: res.data,
    });

    localStorage.setItem(next, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const anteriorPokemones = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones;

  if (localStorage.getItem(previous)) {
    dispatch({
      type: ANTERIOR_POKEMONES_EXITO,
      payload: JSON.parse(localStorage.getItem(previous)),
    });

    return;
  }

  try {
    const res = await axios.get(previous);

    dispatch({
      type: ANTERIOR_POKEMONES_EXITO,
      payload: res.data,
    });
    localStorage.setItem(previous, JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const detallePoke = (
  url = "https://pokeapi.co/api/v2/pokemon/1/"
) => async (dispatch) => {
  const res = await axios.get(url);

  if (localStorage.getItem(url)) {
    dispatch({
      type: INFO_POKEMON_EXITO,
      payload: JSON.parse(localStorage.getItem(url)),
    });

    return;
  }

  try {
    dispatch({
      type: INFO_POKEMON_EXITO,
      payload: {
        name: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default,
      },
    });

    localStorage.setItem(
      url,
      JSON.stringify({
        name: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

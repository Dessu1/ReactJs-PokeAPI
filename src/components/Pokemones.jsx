import React from "react";
/**
 * useDispatch -> sirve para activar nuestra accion
 * useSelector -> nor sirve para leer el state
 */
import { useDispatch, useSelector } from "react-redux";
/**
 * Importamos las acciones que vamos a utilizara
 */
import {
  obtenerPokemones,
  siguientesPokemones,
  anteriorPokemones,
  detallePoke,
} from "../redux/pokeDucks";
import DetallePoke from "./DetallePoke";

const Pokemones = () => {
  const dispatch = useDispatch();
  const pokemones = useSelector((store) => store.pokemones.results); // Traemos por medio del store el state de pokeDucks
  const next = useSelector((store) => store.pokemones.next);
  const previous = useSelector((store) => store.pokemones.previous);

  return (
    <div className='container-fluid'>
      <h1 className='text-center display-4'>Lista de pokemones</h1>

      <hr />

      <div className='row'>
        <div className='col-12 d-flex justify-content-center'>
          {pokemones.length === 0 && (
            <button
              className='btn btn-dark'
              onClick={() => dispatch(obtenerPokemones())}
            >
              Get Pokemones
            </button>
          )}
        </div>
        <div className='col-6 col-md-6 py-1 d-flex justify-content-center'>
          {next && (
            <button
              className='btn btn-dark'
              onClick={() => dispatch(siguientesPokemones())}
            >
              Siguientes
            </button>
          )}
        </div>
        <div className='col-6 col-md-6 py-1 d-flex justify-content-center'>
          {previous && (
            <button
              className='btn btn-dark'
              onClick={() => dispatch(anteriorPokemones())}
            >
              Anterior
            </button>
          )}
        </div>
      </div>

      <hr />

      <div className='row'>
        <div className='col-12 col-md-4 mb-2'>
          <ul className='list-group'>
            {pokemones.map((item) => {
              return (
                <li
                  key={item.name}
                  className='list-group-item d-flex justify-content-between'
                >
                  {item.name}

                  <button
                    className='btn btn-dark btn-sm'
                    onClick={() => dispatch(detallePoke(item.url))}
                  >
                    Info
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='col-12 col-md-8'>
          <DetallePoke />
        </div>
      </div>
    </div>
  );
};

export default Pokemones;

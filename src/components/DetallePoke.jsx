import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { detallePoke } from "../redux/pokeDucks";

const DetallePoke = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fecthData = () => {
      dispatch(detallePoke());
    };

    fecthData();
  }, [dispatch]);

  const pokemon = useSelector((store) => store.pokemones.detallePoke);

  return pokemon ? (
    <div className='card text-center'>
      <div className='card-body'>
        <img src={pokemon.foto} alt='Imagen Pokemon' className='img-fluid' />
        <div className='card-title uppercase h1'>{pokemon.name}</div>
        <p className='card-text'>
          Alto: <strong>{pokemon.alto}</strong> | Ancho:{" "}
          <strong>{pokemon.ancho}</strong>
        </p>
      </div>
    </div>
  ) : null;
};

export default DetallePoke;

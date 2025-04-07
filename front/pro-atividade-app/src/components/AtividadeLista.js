import React from 'react';
import Atividade from './Atividade';

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
        {props.atividades.map((ativ, index) => (
          <Atividade 
            key={ativ.Id || index}
            ativ={ativ}
            handleDeleteAtv={props.handleDeleteAtv}
            handlePegaAtv={props.handlePegaAtv}
          />
        ))}
    </div>  
  )
}

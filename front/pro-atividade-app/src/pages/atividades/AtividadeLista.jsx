import React from 'react';
import AtividadeItem from './AtividadeItem';

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
        {props.atividades.map((ativ, index) => (
          <AtividadeItem 
            key={ativ.Id || index}
            ativ={ativ}
            handleConfirmModal={props.handleConfirmModal}
            handlePegaAtv={props.handlePegaAtv}
          />
        ))}
    </div>  
  )
}

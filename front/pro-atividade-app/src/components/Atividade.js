import React from "react";

function prioridadeLabel(parm) {
  switch (parm) {
    case "1":
      return "Baixa";
    case "2":
      return "Normal";
    case "3":
      return "Alta";
    default:
      return "Não definido";
  }
}

function prioridadeStyle(parm, icon) {
  switch (parm) {
    case "1":
      return icon ? "smile" : "success";
    case "2":
      return icon ? "meh" : "info";
    case "3":
      return icon ? "frown" : "warning";
    default:
      return "Não definido";
  }
}
export default function Atividade(props) {
  return (
    <div
      key={props.ativ.id}
      className={
        "card mb-2 shadow-sm border-" +
        prioridadeStyle(props.ativ.prioridade)
      }
      style={{ borderWidth: "2px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span
              className="badge bg-secondary me-1"
              style={{
                fontSize: "0.75rem",
                padding: "0.4rem 0.5rem",
                verticalAlign: "middle",
              }}
            >
              {props.ativ.id}
            </span>
            - {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={
                "ms-1 text-" + prioridadeStyle(props.ativ.prioridade)
              }
            >
              <i
                className={
                  "me-1 far fa-" +
                  prioridadeStyle(props.ativ.prioridade, true)
                }
              ></i>
              {prioridadeLabel(props.ativ.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">{props.ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button 
             className="btn btn-outline-primary me-2 btn-sm"
             onClick={() => props.handlePegaAtv(props.ativ.id)}>
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => props.handleDeleteAtv(props.ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function AtividadeItem(props) {
  function prioridadeLabel(param) {
    switch (param) {
      case "Baixa":
      case "Normal":
      case "Alta":
        return param;
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param, icon) {
    switch (param) {
      case "Baixa":
        return icon ? "smile" : "success";
      case "Normal":
        return icon ? "meh" : "info";
      case "Alta":
        return icon ? "frown" : "warning";
      default:
        return "Não definido";
    }
  }

  return (
    <div
      key={props.ativ.id}
      className={
        "card mb-2 shadow-sm border-" + prioridadeStyle(props.ativ.prioridade)
      }
      style={{ borderWidth: "2px" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span
              className="badge me-1"
              style={{
                backgroundColor: "#c2c5c5", 
                color: "#212529",           // texto escur
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
              className={"ms-1 text-" + prioridadeStyle(props.ativ.prioridade)}
            >
              <i
                className={
                  "me-1 far fa-" + prioridadeStyle(props.ativ.prioridade, true)
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
            onClick={() => props.handlePegaAtv(props.ativ.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => props.handleConfirmModal(props.ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

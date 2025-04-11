function AtividadeForm({ atividade, setAtividade, addAtividade, atualizarAtividade, cancelarAtividade }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  }

  
  const atividadeInicial = {
    id: 0,
    titulo: "",
    prioridade: "0",
    descricao: "",
  };

  function handleCancelar(e) {
    e.preventDefault();
  
    cancelarAtividade();
    setAtividade(atividadeInicial);
  };
  
  function handleSubmit(e) {
    e.preventDefault();

    if (atividade.id === 0) {
      addAtividade(atividade);
    } else {
      atualizarAtividade(atividade);
    }
  }

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          name="titulo"
          type="text"
          className="form-control"
          value={atividade.titulo}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Prioridade</label>
        <select
          name="prioridade"
          className="form-select"
          value={atividade.prioridade}
          onChange={handleChange}
        >
          <option value="NaoDefinido">Selecionar...</option>
          <option value="Baixa">Baixa</option>
          <option value="Normal">Normal</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          name="descricao"
          className="form-control"
          value={atividade.descricao}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success" type="submit">
        {atividade.id === 0 ? "Salvar" : "Atualizar"}
      </button>

      {atividade?.id !== 0 && (
        <button
            className="btn btn-warning ms-2"
            onClick={handleCancelar}
          >
            Cancelar
      </button>
      )}
    </form>
  );
}

export default AtividadeForm;

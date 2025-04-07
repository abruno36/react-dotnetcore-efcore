function AtividadeForm({ atividade, setAtividade, handleAddAtividade }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  }

  function handleCancelar(e) {
    e.preventDefault();
    setAtividade({
      id: 0,
      titulo: "",
      prioridade: "0",
      descricao: "",
    });
  }

  return (
    <form className="form-control" onSubmit={handleAddAtividade}>
      <h1 className="mt-3">
        {atividade.id === 0 ? "Nova Atividade" : `Editando Atividade #${atividade.id}`}
      </h1>

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
          <option value="0">Selecionar...</option>
          <option value="1">Baixa</option>
          <option value="2">Normal</option>
          <option value="3">Alta</option>
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

      {atividade.id !== 0 && (
        <button className="btn btn-warning ms-2" onClick={handleCancelar}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default AtividadeForm;

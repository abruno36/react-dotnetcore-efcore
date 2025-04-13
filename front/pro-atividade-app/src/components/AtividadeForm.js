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

  const handleCancelar = (e) => {
    e.preventDefault(); 
    cancelarAtividade();
    setAtividade(atividadeInicial);
  };
  
  const handleSubmit= (e) => {
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

      {atividade.id === 0 ? (
          <>
          <button
              className='btn btn-outline-success me-2'
              type='submit'
          >
              <i className='fas fa-plus me-2'></i>
              Salvar
          </button>
          <button
                  className='btn btn-outline-warning'
                  onClick={handleCancelar}
              >
                  <i className='fas fa-plus me-2'></i>
                  Cancelar
              </button>
          </>
      ) : (
          <>
              <button
                  className='btn btn-outline-success me-2'
                  type='submit'
              >
                  <i className='fas fa-plus me-2'></i>
                  Salvar
              </button>
              <button
                  className='btn btn-outline-warning'
                  onClick={handleCancelar}
              >
                  <i className='fas fa-plus me-2'></i>
                  Cancelar
              </button>
          </>
      )}
    </form>
  );
}

export default AtividadeForm;

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import api from './api/atividade';
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const handleAtiviadeModal = () =>
    setShowAtividadeModal(!showAtividadeModal);

  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({
    id: 0,
    titulo: "",
    prioridade: "0",
    descricao: ""
  });

  const atividadeInicial = {
    id: 0,
    titulo: "",
    prioridade: "0",
    descricao: "",
  };

  const handleConfirmModal = (id) => {
      if (id !== 0 && id !== undefined) {
          const atividade = atividades.filter(
              (atividade) => atividade.id === id
          );
          setAtividade(atividade[0]);
      } else {
          setAtividade(atividadeInicial);
      }
      setSmShowConfirmModal(!smShowConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };

  useEffect(() => {
      const getAtividades = async () => {
          const todasAtividades = await pegaTodasAtividades();
          if (todasAtividades) setAtividades(todasAtividades);
      };
      getAtividades();
  }, []);

  const handlePegaAtv = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtiviadeModal(false);
  };

  const novaAtividade = () => {
      setAtividade(atividadeInicial);
      handleAtiviadeModal();
  };

  const addAtividade = async (ativ) => {
    if (!ativ.descricao || !ativ.titulo || ativ.prioridade === "0") {
      toast.warn("Preencha todos os campos.");
      return;
    }  
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);

    handleAtiviadeModal();
  };

  const cancelarAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtiviadeModal();
  };

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter((a) => a.id !== id);
      setAtividades(atividadesFiltradas);
    } 
    handleConfirmModal(0) 
  };

  const atualizarAtividade = async (ativ) => {
      handleAtiviadeModal();
      const response = await api.put(`atividade/${ativ.id}`, ativ);
      const { id } = response.data;
      setAtividades(
          atividades.map((item) => (item.id === id ? response.data : item))
      );
      setAtividade({ id: 0 });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          Atividade {atividade.id !== 0 ? atividade.id : ""}
        </h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        cancelarAtividade={cancelarAtividade}
        handlePegaAtv={handlePegaAtv}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtiviadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            atividade={atividade}
            setAtividade={setAtividade}
            addAtividade={addAtividade}
            atualizarAtividade={atualizarAtividade}
            cancelarAtividade={cancelarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja Excluir a Atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <i className="fas fa-check me-2"></i>
            Sim
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => handleConfirmModal(0)}
          >
            <i className="fas fa-times me-2"></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

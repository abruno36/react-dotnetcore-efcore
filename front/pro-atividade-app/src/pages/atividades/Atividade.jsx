import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import api from '../../api/atividade';
import TitlePage from "../../components/TitlePage";
import AtividadeLista from './AtividadeLista';
import AtividadeForm from './AtividadeForm';

export default function Atividade() {
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

      try {
          const response = await api.post('atividade', ativ);
          setAtividades([...atividades, response.data]);
          handleAtiviadeModal();

          // Mensagem de sucesso
          toast.success(`Atividade "${response.data.titulo}" inserida com sucesso!`);
      } catch (err) {
          console.error("Erro ao adicionar atividade:", err.response);

          // Verificar o status da resposta e exibir a mensagem correta
          const mensagem = err.response?.data?.erro || "Erro ao adicionar atividade. Tente novamente.";
          toast.error(mensagem);
      }
  };

  const cancelarAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtiviadeModal();
  };

  const deletarAtividade = async (id) => {
      const atividadeExcluida = atividades.find((a) => a.id === id);

      try {
          await api.delete(`atividade/${id}`);

          const atividadesFiltradas = atividades.filter((a) => a.id !== id);
          setAtividades(atividadesFiltradas);

          toast.success(`Atividade "${atividadeExcluida?.titulo}" excluída com sucesso!`);
      } catch (err) {
          console.error("Erro ao excluir atividade:", err);
          const mensagem = err.response?.data?.erro || "Erro ao excluir atividade. Tente novamente.";
          toast.error(mensagem);
      }

      handleConfirmModal(0);
  };


  const atualizarAtividade = async (ativ) => {
      handleAtiviadeModal();
      try {
          const response = await api.put(`atividade/${ativ.id}`, ativ);
          const { id } = response.data;
          setAtividades(
              atividades.map((item) => (item.id === id ? response.data : item))
          );
          setAtividade({ id: 0 });

          // Mensagem de sucesso
          toast.success(`Atividade "${response.data.titulo}" atualizada com sucesso!`);
      } catch (err) {
          console.error("Erro ao atualizar atividade:", err);

          // Verificar o status da resposta e exibir a mensagem correta
          const mensagem = err.response?.data?.erro || "Erro ao atualizar atividade. Tente novamente.";
          toast.error(mensagem);
      }
  };

  return (
    <div className="container mt-3">
      <TitlePage
        title={"Atividade " + (atividade.id !== 0 ? atividade.id : "")}
      >
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus"></i>
        </Button>
      </TitlePage>

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

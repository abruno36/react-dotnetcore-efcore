import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import api from '../../api/atividade';
import TitlePage from "../../components/TitlePage";
import AtividadeLista from './AtividadeLista';
import AtividadeForm from './AtividadeForm';
import { IAtividade, Prioridade } from '../../model/atividade';
import axios from "axios";

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: '',
  prioridade: Prioridade.NaoDefinido,
  descricao: '',
};

const Atividade = () => {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);

  const handleAtiviadeModal = () =>
    setShowAtividadeModal(!showAtividadeModal);


  const handleConfirmModal = (id: number) => {
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

  const pegarAtividade = (id: number) => {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
      handleAtiviadeModal();
  };

  const novaAtividade = () => {
      setAtividade(atividadeInicial);
      handleAtiviadeModal();
  };

  const addAtividade = async (ativ: IAtividade) => {
    if (!ativ.descricao || !ativ.titulo || !ativ.prioridade) {
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
        if (axios.isAxiosError(err)) {
          const mensagem =
            err.response?.data?.erro ||
            "Erro ao adicionar atividade. Tente novamente.";
          toast.error(mensagem);
        } else {
          toast.error("Erro inesperado. Tente novamente.");
        }
      }
};

  const cancelarAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtiviadeModal();
  };

  const deletarAtividade = async (id: number) => {
      const atividadeExcluida = atividades.find((a) => a.id === id);

      try {
          await api.delete(`atividade/${id}`);

          const atividadesFiltradas = atividades.filter((a) => a.id !== id);
          setAtividades(atividadesFiltradas);

          toast.success(`Atividade "${atividadeExcluida?.titulo}" excluída com sucesso!`);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const mensagem =
              err.response?.data?.erro ||
              "Erro ao deletar atividade. Tente novamente.";
            toast.error(mensagem);
          } else {
            toast.error("Erro inesperado. Tente novamente.");
          }
        }

      handleConfirmModal(0);
  };


  const atualizarAtividade = async (ativ: IAtividade) => {
      handleAtiviadeModal();
      try {
          const response = await api.put(`atividade/${ativ.id}`, ativ);
          const { id } = response.data;
          setAtividades(
              atividades.map((item) => (item.id === id ? response.data : item))
          );
          setAtividade(response.data);

          // Mensagem de sucesso
          toast.success(`Atividade "${response.data.titulo}" atualizada com sucesso!`);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const mensagem =
              err.response?.data?.erro ||
              "Erro ao atualizar atividade. Tente novamente.";
            toast.error(mensagem);
          } else {
            toast.error("Erro inesperado. Tente novamente.");
          }
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
        pegarAtividade={pegarAtividade}
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
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={handleAtiviadeModal}>
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

export default Atividade;
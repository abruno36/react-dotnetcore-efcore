import { useState } from "react";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import { toast } from 'react-toastify';

function App() {
  const initialState = [
    {
      id: 1,
      prioridade: "3",
      titulo: "Título atividade Um",
      descricao: "Primeira Atividade",
    },
    {
      id: 2,
      prioridade: "1",
      titulo: "Título atividade Dois",
      descricao: "Segunda Atividade",
    },
  ];

  const atividadeInicial = {
    id: 0,
    titulo: "",
    prioridade: "0",
    descricao: "",
  };

  const [atividades, setAtividades] = useState(initialState);
  const [atividade, setAtividade] = useState(atividadeInicial);

  function handleDeleteAtv(id) {
    const atividadesFiltradas = atividades.filter((a) => a.id !== id);
    setAtividades(atividadesFiltradas);

    // Se estava editando essa atividade, limpa o form
    if (atividade.id === id) {
      setAtividade(atividadeInicial);
    }
  }

  function handlePegaAtv(id) {
    const atv = atividades.find((a) => a.id === id);
    if (atv) {
      setAtividade(atv);
    }
  }

  function handleAddAtividade(e) {
    e.preventDefault();

    if (!atividade.descricao || !atividade.titulo || atividade.prioridade === "0") {
      toast.warn("Preencha todos os campos.");
      return;
    }

    // Se for edição
    if (atividade.id !== 0) {
      const atividadesAtualizadas = atividades.map((a) =>
        a.id === atividade.id ? atividade : a
      );
      setAtividades(atividadesAtualizadas);
    } else {
      // Nova atividade
      const novoId =
        atividades.length > 0 ? Math.max(...atividades.map((a) => a.id)) + 1 : 1;

      const novaAtividade = {
        ...atividade,
        id: novoId,
      };

      setAtividades([...atividades, novaAtividade]);
    }

    // Limpa o form
    setAtividade(atividadeInicial);
  }

  function handleCancelar() {
    setAtividade(atividadeInicial);
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Minhas Atividades</h1>

      <AtividadeForm
        atividade={atividade}
        setAtividade={setAtividade}
        handleAddAtividade={handleAddAtividade}
        handleCancelar={handleCancelar}
      />

      <hr />

      <AtividadeLista
        atividades={atividades}
        handleDeleteAtv={handleDeleteAtv}
        handlePegaAtv={handlePegaAtv}
      />
    </div>
  );
}

export default App;

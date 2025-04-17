import Atividade from "./pages/atividades/Atividade";
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Cliente from './pages/clientes/Cliente';
import PageNotFound from "./pages/PageNotFound";
import ClienteForm from "./pages/clientes/ClienteForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/atividades/*" element={<Atividade />} />
      <Route path="/clientes/*" element={<Cliente />} />
      <Route path="/cliente/:id/atividade" element={<Atividade />} />
      <Route path='/cliente/detalhe/' element={<ClienteForm />} />
      <Route path='/cliente/detalhe/:id' element={<ClienteForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

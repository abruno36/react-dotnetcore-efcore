using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }
        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.PegaPorTituloAsync(model.Titulo) != null)
                throw new RegraDeNegocioException("Já existe uma atividade com esse título");

            if (await _atividadeRepo.PegaPorIdAsync(model.Id) != null)
                throw new RegraDeNegocioException("Já existe uma atividade com esse ID");

            _atividadeRepo.Adicionar(model);
            if (await _atividadeRepo.SalvarMudancasAsync())
                return model;

            throw new RegraDeNegocioException("Erro ao salvar a atividade.");
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new RegraDeNegocioException("Não se pode alterar atividade já concluída.");

            var atividadeExistente = await _atividadeRepo.PegaPorIdAsync(model.Id);
            if (atividadeExistente == null)
                throw new RegraDeNegocioException("Atividade não encontrada.");

            _atividadeRepo.Atualizar(model);
            if (await _atividadeRepo.SalvarMudancasAsync())
                return model;

            throw new RegraDeNegocioException("Erro ao salvar alterações da atividade.");
        }


        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId);
            if (atividade == null) throw new RegraDeNegocioException("Atividade que tentou deletar não existe");

            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade?> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId);
                if (atividade == null) return null;

                return atividade;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]?> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegaTodasAsync();
                if (atividades == null) return null;

                return atividades;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
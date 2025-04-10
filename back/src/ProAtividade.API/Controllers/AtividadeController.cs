using Microsoft.AspNetCore.Mvc;
using ProAtividade.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public List<Atividade> Atividades = new List<Atividade>() {
            new Atividade { Id = 1, Titulo = "Estudar", Descricao = "Estudar C#", Prioridade = Prioridade.Alta },
            new Atividade { Id = 2, Titulo = "Treinar", Descricao = "Exercício físico", Prioridade = Prioridade.Normal },
            new Atividade { Id = 3, Titulo = "Descansar", Descricao = "Assistir algo", Prioridade = Prioridade.Baixa }
        };      

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return Atividades;
            
        }

        [HttpGet("{id}")]
        public Atividade  Get(int id)
        {
            return Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }

        [HttpPost]
        public IEnumerable<Atividade> Post([FromBody] IEnumerable<Atividade> atividades)
        {
            Atividades.AddRange(atividades);
            return Atividades;
        }   

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            atividade.Id = atividade.Id+1;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"método Delete id = {id}";
        }
    }
}
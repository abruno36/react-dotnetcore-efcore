using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using ProAtividade.Api.Models;
using ProAtividade.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            _context = context; 
        }
        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
            
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(atv => atv.Id == id);

            if (atividade == null)
                return NotFound($"Atividade com ID {id} não foi localizada.");

            return Ok(atividade);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Atividade atividade)
        {
            _context.Atividades.Add(atividade);

            if (_context.SaveChanges() > 0)
            {
                var mensagem = $"Atividade \"{atividade.Titulo}\" inserida com sucesso.";
                return CreatedAtAction(nameof(Post), new { id = atividade.Id }, new { mensagem, atividade });
            }

            return BadRequest("Não foi possível adicionar a atividade.");
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Atividade atividade)
        {
            if (atividade.Id != id)
                return BadRequest("ID da atividade não confere com o ID informado na rota.");

            var atividadeExistente = _context.Atividades.FirstOrDefault(atv => atv.Id == id);

            if (atividadeExistente == null)
                return NotFound("Atividade não encontrada.");

            _context.Entry(atividadeExistente).CurrentValues.SetValues(atividade);
            
            _context.SaveChanges();

            var mensagem = $"Atividade \"{atividade.Titulo}\" alterada com sucesso.";
            return Ok(new { mensagem, atividade });
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(atv => atv.Id == id);

            if (atividade == null)
                return NotFound("Atividade não localizada para exclusão.");

            _context.Atividades.Remove(atividade);
            _context.SaveChanges();

            return Ok($"Atividade ID {id} removida com sucesso.");
        }

    }
}
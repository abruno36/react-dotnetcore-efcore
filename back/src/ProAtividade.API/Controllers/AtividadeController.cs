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
        public Atividade Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);

            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(atv => atv.Id == atividade.Id);
            else
                throw new Exception("Problemas ao incluir uma atividade");
            
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id)
                throw new Exception("Problemas ao alterar uma atividade");

            _context.Atividades.Update(atividade);

            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(atv => atv.Id == atividade.Id);
            else
                throw new Exception("Problemas ao alterar uma atividade");
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(atv => atv.Id == id);

            if (atividade == null)
                throw new Exception("Problemas ao deletar uma atividade");

            _context.Atividades.Remove(atividade);
            _context.SaveChanges();

            return Ok($"Atividade ID {id} removida com sucesso.");
        }

    }
}
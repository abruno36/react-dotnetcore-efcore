using Microsoft.AspNetCore.Mvc;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public string get()
        {
            return "método get";
        }
    }
}
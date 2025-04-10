using Microsoft.EntityFrameworkCore;
using ProAtividade.Api.Models;

namespace ProAtividade.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Atividade> Atividades { get; set; }

    }
}
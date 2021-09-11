using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        // public DbSet<Holding> holding { get; set; }
        public DbSet<Cash> Cash { get; set; }
        public DbSet<Crypto> Crypto { get; set; }
        public DbSet<Stock> Stock { get; set; }
        public DbSet<Super> Super { get; set; }

    }
    
}
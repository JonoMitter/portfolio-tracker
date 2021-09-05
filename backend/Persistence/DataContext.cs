using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> user { get; set; }
        // public DbSet<Holding> holding { get; set; }
        public DbSet<Cash> cash { get; set; }
        public DbSet<Crypto> crypto { get; set; }
        public DbSet<Stock> stock { get; set; }
        public DbSet<Super> super { get; set; }

    }
    
}
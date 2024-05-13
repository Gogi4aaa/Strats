namespace Strats.Data
{
	using Microsoft.EntityFrameworkCore;
	using Models.Database;

	public class StratsDbContext : DbContext
	{
		public StratsDbContext(DbContextOptions<StratsDbContext> options)
		: base(options)
		{
			
		}

		public DbSet<User> Users { get; set; } = null!;

		public DbSet<Role> Roles { get; set; } = null!;

		public DbSet<Claim> Claims { get; set; } = null!;

		public DbSet<RoleClaim> RoleClaims { get; set; } = null!;

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}
	}
}

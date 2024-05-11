namespace Strats.Data
{
	using Microsoft.EntityFrameworkCore;

	public class StratsDbContext : DbContext
	{
		public StratsDbContext(DbContextOptions<StratsDbContext> options)
		: base(options)
		{
			
		}
	}
}

namespace Strats.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations;

	public class Claim
	{
		public Claim()
		{
			this.Id = new Guid();
			this.RoleClaims = new List<RoleClaim>();
		}
		[Key]
		public Guid Id { get; set; }
		public string Name { get; set; } = null!;
		public ICollection<RoleClaim> RoleClaims { get; set; }
	}
}

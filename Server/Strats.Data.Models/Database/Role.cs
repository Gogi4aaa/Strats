namespace Strats.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations.Schema;
	using System.ComponentModel.DataAnnotations;

	public class Role
	{
		public Role()
		{
			this.Id = new Guid();
			this.Users = new List<User>();
			this.RoleClaims = new List<RoleClaim>();
		}

		[Key]
		public Guid Id { get; set; }

		[Required] 
		public string Name { get; set; } = null!;

		public ICollection<User> Users { get; set; }
		public ICollection<RoleClaim> RoleClaims { get; set; }
	}
}

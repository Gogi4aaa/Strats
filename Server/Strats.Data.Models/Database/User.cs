namespace Strats.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public class User
	{
		public User()
		{
			this.Id = new Guid();
		}

		[Key]
		public Guid Id { get; set; }

		[Required] 
		public string FirstName { get; set; } = null!;

		[Required]
		public string LastName { get; set; } = null!;

		[Required]
		public string Username { get; set; } = null!;

		[Required]
		public string Email { get; set; } = null!;

		[Required]
		public string Password { get; set; } = null!;

		//Required 1:M
		
		[ForeignKey(nameof(Role))]
		public Guid RoleId { get; set; }
		public Role Role { get; set; }

	}
}

namespace Strats.Data.Models.Database
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public class RoleClaim
	{
		[Key] 
		public Guid Id { get; set; }

		[ForeignKey(nameof(Role))]
		public Guid RoleId { get; set; }

		public Role Role { get; set; } = null!;

		[ForeignKey(nameof(Claim))]
		public Guid ClaimId { get; set; }

		public Claim Claim { get; set; } = null!;
	}
}

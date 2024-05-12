using System.Security.Claims;

namespace Strats.Services.Data.Interfaces
{
	public interface IJwtService
	{
		string CreateToken(Guid userId, string roleName, List<string> roleClaims, string jwtKey, string jwtIssuer, string jwtAudience);
		List<string> GetUserClaimsFromToken(ClaimsPrincipal user);
		int GetUserIdFromToken(ClaimsPrincipal user);
		string GetUserRoleNameFromToken(ClaimsPrincipal user);
	}
}

namespace Strats.Services.Data
{
	using System.IdentityModel.Tokens.Jwt;
	using System.Security.Claims;
	using System.Text;
	using Interfaces;
	using Microsoft.IdentityModel.Tokens;

	public class JwtService : IJwtService
	{
		public string CreateToken(Guid userId, string roleName, List<string> roleClaims, string jwtKey, string jwtIssuer, string jwtAudience)
		{
			List<Claim> identityClaims = new List<Claim>()
			{
				new Claim(ClaimTypes.Name, userId.ToString()),
				new Claim(ClaimTypes.Role, roleName)
			};

			//User custom claims

			foreach (var claim in roleClaims)
			{
				//Adding each custom claim in the token
				identityClaims.Add(new System.Security.Claims.Claim("RoleClaim", claim.ToString()));
			}

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

			var token = new JwtSecurityToken(
				claims: identityClaims,
				issuer: jwtIssuer,
				audience: jwtAudience,
				expires: DateTime.UtcNow.AddDays(7),
				signingCredentials: creds);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}

		public List<string> GetUserClaimsFromToken(ClaimsPrincipal user)
		{
			var claims = user.FindAll("RoleClaim")?.ToList();
			if (claims == null)
			{
				throw new Exception("Could not extract user claims from JWT token");
			}

			return claims.Select(x => x.Value).ToList();
		}

		public int GetUserIdFromToken(ClaimsPrincipal user)
		{
			string? userIdRawValue = user.FindFirst(ClaimTypes.Name)?.Value;
			int userId;
			if (userIdRawValue == null)
			{
				throw new Exception("User is not logged in");
			}

			if (int.TryParse(userIdRawValue, out userId))
			{
				return userId;
			}
			else
			{
				throw new Exception("Could not parse id value from JWT claim to an integer");
			}
		}

		public string GetUserRoleNameFromToken(ClaimsPrincipal user)
		{
			string? userRoleName = user.FindFirst(ClaimTypes.Role)?.Value;
			if (userRoleName == null)
			{
				throw new Exception("Could not extract user role name from JWT token");
			}
			return userRoleName;
		}
	}
}

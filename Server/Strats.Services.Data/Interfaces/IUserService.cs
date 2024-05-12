namespace Strats.Services.Data.Interfaces
{
	using Strats.Data.Models.ApiResponse;
	using Strats.Data.Models.Request;

	public interface IUserService
	{
		Task<ApiResponse> Register(UserRegisterRequest request);
		
	}
}

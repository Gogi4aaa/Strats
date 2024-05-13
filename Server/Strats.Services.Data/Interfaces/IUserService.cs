namespace Strats.Services.Data.Interfaces
{
	using Strats.Data.Models.ApiResponse;
	using Strats.Data.Models.Request;
	using Strats.Data.Models.Response;

	public interface IUserService
	{
		Task<ApiResponse> Register(UserRegisterRequest request);
		Task<ApiResponseData<UserLoginResponse>> Login(UserLoginRequest request);
	}
}

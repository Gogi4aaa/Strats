namespace Strats.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Data;
	using Data.Models.ApiResponse;
	using Data.Models.Request;
	using Data.Models.Response;
	using Services.Data.Interfaces;

	[Route("[controller]/[action]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserService userService;
		public UserController(IUserService userService)
		{
			this.userService = userService;
		}

		[HttpPost]
		public async Task<IActionResult> Register(UserRegisterRequest request)
		{
			ApiResponse result;
			try
			{
				result = await this.userService.Register(request);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result);
		}

		[HttpPost]
		public async Task<ActionResult<UserLoginResponse>> Login(UserLoginRequest request)
		{
			ApiResponseData<UserLoginResponse> result;
			try
			{
				result = await this.userService.Login(request);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result.Data);
		}
	}
}

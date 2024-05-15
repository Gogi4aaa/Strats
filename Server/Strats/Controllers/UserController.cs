namespace Strats.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Data;
	using Data.Models.ApiResponse;
	using Data.Models.Request;
	using Data.Models.Response;
	using Microsoft.AspNetCore.Authorization;
	using Services.Data.Interfaces;
	using Microsoft.AspNetCore.Authentication.JwtBearer;

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
				if (!result.IsValid)
				{
					return BadRequest(result.Error);
				}
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
				if (!result.IsValid)
				{
					return BadRequest(result.Error);
				}
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result.Data);
		}

		[HttpGet]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public ActionResult Test()
		{
			
			return Ok();
		}
	}
}

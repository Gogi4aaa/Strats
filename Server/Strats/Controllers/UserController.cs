namespace Strats.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Data;
	using Data.Models.ApiResponse;
	using Data.Models.Request;
	using Services.Data.Interfaces;

	[Route("api/[controller]")]
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
				if (result.Error != null || !result.IsValid)
				{
					return BadRequest(result.Error.Message);
				}
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result);
		}
	}
}

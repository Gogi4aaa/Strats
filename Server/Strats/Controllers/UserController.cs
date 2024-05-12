namespace Strats.Controllers
{
	using Microsoft.AspNetCore.Mvc;
	using Data;
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
			var result = await this.userService.Register(request);
			return Ok(result);
		}
	}
}

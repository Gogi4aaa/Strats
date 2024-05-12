using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Strats.Controllers
{
	using Data;
	using Data.Models.Request;

	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly StratsDbContext dbContext;
		public UserController(StratsDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpPost]
		[ProducesResponseType(200)]
		public IActionResult Register(UserRegisterRequest request)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok();
		}
	}
}

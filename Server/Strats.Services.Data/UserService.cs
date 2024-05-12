namespace Strats.Services.Data
{
	using Common;
	using Interfaces;
	using Strats.Data;
	using Strats.Data.Models.ApiResponse;
	using Strats.Data.Models.Database;
	using Strats.Data.Models.Request;
	using Strats.Data.Models.Response;
	public class UserService : IUserService
	{
		private readonly StratsDbContext dbContext;
		private readonly ICryptographyService cryptographyService;
		public UserService(StratsDbContext dbContext, ICryptographyService cryptographyService)
		{
			this.dbContext = dbContext;
			this.cryptographyService = cryptographyService;
		}

		public async Task<ApiResponse> Register(UserRegisterRequest request)
		{
			if (request.Username.Length > 30 || request.Username.Length < 3)
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(nameof(User), ValidationConstants.INCORRECT_LENGTH);
			}

			if (this.dbContext.Users.Any(x => x.Username == request.Username))
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.USERNAME, ValidationConstants.ALREADY_EXISTS);
			}

			if (request.Password.Length < 8)
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.PASSWORD, ValidationConstants.SHORT);
			}

			if (this.dbContext.Users.Any(x => x.Email == request.Email))
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.EMAIL, ValidationConstants.ALREADY_EXISTS);
			}

			User userToAdd = new User
			{
				FirstName = request.FirstName,
				LastName = request.LastName,
				Username = request.Username,
				Email = request.Email,
				Password = this.cryptographyService.ComputeSha256Hash(request.Password),
				RoleId = Guid.Parse("171340b6-5597-47aa-86c3-5aa9f2a779a5")
			};

			await this.dbContext.Users.AddAsync(userToAdd);
			await this.dbContext.SaveChangesAsync();

			return ApiResponse.CorrectResponse();
		}
	}
}

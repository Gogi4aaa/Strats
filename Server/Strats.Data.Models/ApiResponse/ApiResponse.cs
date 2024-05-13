namespace Strats.Data.Models.ApiResponse
{
	public class ApiResponse
	{
		protected ApiResponse(bool isValid, string errorKey = null, string errorMessage = null)
		{
			this.IsValid = isValid;

			if (!isValid)
			{
				this.Error = new ErrorResponse(errorKey, errorMessage);
			}
		}

		public bool IsValid { get; set; }
		public ErrorResponse Error { get; set; }

		public static ApiResponse BadResponse(string errorKey, string errorMessage)
		{
			return new ApiResponse(false, errorKey, errorMessage);
		}

		public static ApiResponse CorrectResponse()
		{
			return new ApiResponse(true);
		}
	}
}
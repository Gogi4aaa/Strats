namespace Strats.Data.Models.ApiResponse
{
	public class ApiResponseData<T> : ApiResponse
	{
		private ApiResponseData(T data, bool isValid, string errorKey = null, string errorMessage = null) : base(isValid, errorKey, errorMessage)
		{
			this.Data = data;
		}

		public T Data { get; set; }

		public static ApiResponseData<T> BadResponse(string errorKey, string errorMessage)
		{
			return new ApiResponseData<T>(default(T), false, errorKey, errorMessage);
		}

		public static ApiResponseData<T> CorrectResponse(T data)
		{
			return new ApiResponseData<T>(data, true);
		}
	}
}

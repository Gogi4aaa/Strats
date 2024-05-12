using Microsoft.EntityFrameworkCore;
using Strats.Data;

var myCors = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StratsDbContext>(options => 
	options.UseNpgsql(connectionString));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: myCors,
		policy =>
		{
			policy.WithOrigins("https://localhost:7129")
				.AllowAnyMethod()
				.AllowAnyHeader();
		});
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseRouting();

app.UseCors(myCors);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

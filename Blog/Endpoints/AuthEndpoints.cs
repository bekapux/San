using Blog.Database;
using Blog.Database.Entities;
using Blog.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Blog.Endpoints;

public class AuthEndpoints : IEndpoints
{
    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        var group = app
            .MapGroup($"api/auth")
            .WithTags("Auth");

        group.MapPost("register", async (BlogDbContext context, UserManager<User> userManager, UserRegisterDto newUserDto) =>
        {
            var newUser = new User
            {
                UserName = newUserDto.Username,
                Firstname = newUserDto.Firstname,
                Lastname = newUserDto.Lastname,
                Email = newUserDto.Email
            };

            var result = await userManager.CreateAsync(newUser, newUserDto.Password);

            if (result.Succeeded)
            {
                return Results.Accepted();
            }
            else
            {
                return Results.BadRequest(result.Errors);
            }
        });

        group.MapPost("/signin", async (UserManager<User> userManager, IConfiguration configuration, SignInDto signInDto) =>
        {
            // Find the user by username or email
            var user = await userManager.FindByEmailAsync(signInDto.Email);

            if (user is null)
            {
                return Results.BadRequest("Invalid username or password.");
            }

            // Check if the password is correct
            var passwordValid = await userManager.CheckPasswordAsync(user, signInDto.Password);

            if (!passwordValid)
            {
                return Results.BadRequest("Invalid username or password.");
            }

            // Generate JWT Token
            var jwtSettings = configuration.GetSection("JwtSettings");
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, user.Id)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ValidityMinutes"]!)),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Results.Ok(new { Token = tokenString, user.Firstname, user.Lastname, user.Email });
        });
    }
}

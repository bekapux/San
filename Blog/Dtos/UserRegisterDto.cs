namespace Blog.Dtos;

public sealed record UserRegisterDto(
    string Email, 
    string Username, 
    string Firstname, 
    string Lastname,
    string Password);

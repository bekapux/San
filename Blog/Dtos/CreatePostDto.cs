namespace Blog.Dtos;

public sealed record CreatePostDto(string Title, string ShortDescription, string FullDescription);
public sealed record UpdatePostDto(string Id, string Title, string ShortDescription, string FullDescription);
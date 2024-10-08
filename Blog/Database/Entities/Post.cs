using Blog.Database.Entities.Utilities;

namespace Blog.Database.Entities;

public sealed class Post : Entity
{
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string FullDescription { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;

    public User? User { get; set; }
}

using Blog.Database.Entities.Utilities;

namespace Blog.Database.Entities;

public class Comment : Entity
{
    public string Text { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;

    public User? User { get; set; }
}

namespace Blog.Database.Entities.Utilities;

public abstract class Entity
{
    public string Id { get; set; } = string.Empty;
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}

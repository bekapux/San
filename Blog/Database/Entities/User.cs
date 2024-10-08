using Microsoft.AspNetCore.Identity;

namespace Blog.Database.Entities;

public class User : IdentityUser
{
    public string Firstname { get; set; } = string.Empty;
    public string Lastname { get; set; } = string.Empty;
    public ICollection<Post>? Blogs { get; set; }
}

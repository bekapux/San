using Blog.Database;
using Blog.Database.Entities;
using Blog.Dtos;
using Blog.Utilities;
using Microsoft.EntityFrameworkCore;

namespace Blog.Endpoints;

public sealed class PostsEndpoints : IEndpoints
{
    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        var group = app
            .MapGroup($"api/posts")
            .WithTags("Posts");

        group.MapGet("{pageNumber:int}/{itemsPerPage:int}", async (
            BlogDbContext context,
            int pageNumber,
            int itemsPerPage,
            CancellationToken cancellationToken) =>
        {
            var result = await context.Posts
                .AsNoTracking()
                .OrderByDescending(p => p.DateCreated)
                .Paginate(pageNumber, itemsPerPage)
                .Select(x => new Post
                {
                    Title = x.Title,
                    ShortDescription = x.ShortDescription,
                    FullDescription = x.FullDescription,
                    User = new User
                    {
                        Email = x.User!.Email,
                    }
                })
                .ToListAsync(cancellationToken);

            return Results.Ok(result.Select(x => new
            {
                x.Title,
                x.ShortDescription,
                x.FullDescription,
                x.User!.Email
            }));

        });

        group.MapGet("{id:Guid}", async (BlogDbContext context, string id, CancellationToken cancellationToken) =>
        {
            var result = await context.Posts
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (result is null)
            {
                return Results.NotFound("");
            }

            return Results.Ok(new { result.Id, result.ShortDescription, result.FullDescription });
        });

        group.MapPost("", async (BlogDbContext context, CreatePostDto post) =>
        {
            var newPost = new Post
            {
                Id = Guid.NewGuid().ToString(),
                Title = post.Title,
                DateCreated = DateTime.Now,
                FullDescription = post.FullDescription,
                ShortDescription = post.ShortDescription,
                UserId = Guid.NewGuid().ToString()
            };

            context.Posts.Add(newPost);

            await context.SaveChangesAsync();

            return Results.Accepted();
        });

        group.MapPut("", async (BlogDbContext context, UpdatePostDto post) =>
        {
            var postToUpdate = await context.Posts.FirstOrDefaultAsync(x => x.Id == post.Id);

            if (postToUpdate is null)
            {
                return Results.NotFound();
            }

            postToUpdate.Title = post.Title;
            postToUpdate.FullDescription = post.FullDescription;
            postToUpdate.ShortDescription = post.ShortDescription;

            context.Posts.Update(postToUpdate);

            await context.SaveChangesAsync();

            return Results.Accepted();
        });

        group.MapDelete("{id}", async (BlogDbContext context, string id) =>
        {
            var result = await context.Posts
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();

            return result > 0 ? Results.Ok() : Results.NotFound();
        });
    }
}

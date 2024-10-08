namespace Blog.Utilities;

public static class IQueryableExtensions
{
    public static IQueryable<T> Paginate<T>(this IQueryable<T> query, int pageNumber, int itemsPerPage)
    {
        return query
            .Skip((pageNumber - 1) * itemsPerPage)
            .Take(itemsPerPage);
    }
}

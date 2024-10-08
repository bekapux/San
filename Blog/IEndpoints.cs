namespace Blog;

public interface IEndpoints
{
    public static abstract void DefineEndpoints(IEndpointRouteBuilder app);
}

public static class EndpointExtensions
{
    public static void UseEndpointsFromAssembly<TMarker>(this IApplicationBuilder app)
    {
        UseGroupedEndpointsFromAssembly(app, typeof(TMarker));
    }

    private static void UseGroupedEndpointsFromAssembly(IApplicationBuilder app, Type type)
    {
        var endpointTypes = type.Assembly.DefinedTypes
            .Where(x => !x.IsAbstract && !x.IsInterface && typeof(IEndpoints).IsAssignableFrom(x));

        foreach (var endpointType in endpointTypes)
        {
            endpointType.GetMethod(nameof(IEndpoints.DefineEndpoints))!
                .Invoke(null, [app]);
        }
    }
}


using Application.Common.Exceptions;
using System.Net;
using System.Text.Json;

namespace Api.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, title, errors) = exception switch
        {
            NotFoundException => (HttpStatusCode.NotFound, exception.Message, (object?)null),
            ConflictException => (HttpStatusCode.Conflict, exception.Message, null),
            ValidationException validationEx => (HttpStatusCode.BadRequest, "Validation failed.", validationEx.Errors),
            UnauthorizedAccessException => (HttpStatusCode.Forbidden, "You are not authorized to perform this action.", null),
            _ => (HttpStatusCode.InternalServerError, "An unexpected error occurred.", null)
        };

        if (statusCode == HttpStatusCode.InternalServerError)
        {
            _logger.LogError(exception, "An unhandled exception occurred");
        }

        context.Response.StatusCode = (int)statusCode;

        var response = new
        {
            title,
            status = (int)statusCode,
            errors,
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}

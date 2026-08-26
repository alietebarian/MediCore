using Application.Auth.Commands.Login;
using Application.Auth.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult GetMe()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = User.FindFirstValue(ClaimTypes.Email);
        var userName = User.FindFirstValue(ClaimTypes.Name);
        //var role = User.FindFirstValue(ClaimTypes.Role);
        var roles = User.FindAll(ClaimTypes.Role)
            .Select(x => x.Value)
            .ToList();

        return Ok(new { Id = userId, Email = email, UserName = userName, Roles = roles });
    }


}

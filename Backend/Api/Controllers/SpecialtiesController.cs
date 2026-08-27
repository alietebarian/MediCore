using Application.Specialties.Queries.GetSpecialties;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/specialties")]
[ApiController]
[Authorize]
public class SpecialtiesController : ControllerBase
{
    private readonly IMediator _mediator;

    public SpecialtiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetSpecialtiesQuery());
        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles ="SuperAdmin")]
    public async Task<IActionResult> Create([FromBody] string name)
    {
        return Ok();
    }
}

using Application.Clinics.Commands.CreateClinic;
using Application.Clinics.Commands.UpdateClinic;
using Application.Clinics.Queries.GetClinicById;
using Application.Clinics.Queries.GetClinics;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/clinics")]
[ApiController]
[Authorize(Roles = "SuperAdmin")]
public class ClinicsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ClinicsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateClinicCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] GetClinicsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetClinicByIdQuery(id));

        return result is null ? NotFound() : Ok(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateClinicCommand command)
    {
        if (id != command.Id)
            return BadRequest("Route id does not match body id.");

        await _mediator.Send(command);
        return NoContent();
    }
}

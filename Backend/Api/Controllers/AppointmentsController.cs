using Application.Appointments.Commands.CreateAppointment;
using Application.Appointments.Commands.UpdateAppointmentStatus;
using Application.Appointments.Queries.GetAppointments;

//using Application.Commands.UpdateAppointmentStatus;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/appointments")]
[ApiController]
[Authorize]
public class AppointmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AppointmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAppointmentCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] GetAppointmentsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] AppointmentStatus newStatus)
    {
        await _mediator.Send(new UpdateAppointmentStatusCommand(id, newStatus));
        return NoContent();
    }
}

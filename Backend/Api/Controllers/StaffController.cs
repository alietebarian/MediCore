using Application.Staff.Commands.CreateStaff;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/staff")]
[ApiController]
[Authorize(Roles = "ClinicAdmin,SuperAdmin")]
public class StaffController : ControllerBase
{
    private readonly IMediator _mediator;

    public StaffController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("doctors")]
    public async Task<IActionResult> CreateDoctor(CreateDoctorCommand command)
    {
        await _mediator.Send(command);

        return Created();
    }
}

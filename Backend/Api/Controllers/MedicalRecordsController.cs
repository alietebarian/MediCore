using Application.MedicalRecords.Command.CreateMedicalRecord;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/medical-records")]
[ApiController]
[Authorize(Roles ="Doctor")]
public class MedicalRecordsController : ControllerBase
{
    private readonly IMediator _mediator;

    public MedicalRecordsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMedicalRecordCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new {id}, new {id});
    }
}

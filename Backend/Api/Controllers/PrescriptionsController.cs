using Application.Prescriptions.Commands.CreatePrescription;
using Application.Prescriptions.Queries.GetPrescriptionsByMedicalRecord;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/prescriptions")]
[ApiController]
[Authorize(Roles = "Doctor,SuperAdmin")]
public class PrescriptionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PrescriptionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePrescriptionCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpGet("medical-record/{medicalRecordId:guid}")]
    [Authorize(Roles = "Doctor,Receptionist,Nurse,ClinicAdmin,SuperAdmin")]
    public async Task<IActionResult> GetByMedicalRecord(Guid medicalRecordId)
    {
        var result = await _mediator.Send(new GetPrescriptionsByMedicalRecordQuery(medicalRecordId));
        return Ok(result);
    }
}

using Application.MedicalRecords.Queries.GetMedicalRecordsByPatient;
using Application.Patients.Commands.AddPatientAllergy;
using Application.Patients.Commands.RemovePatientAllergy;
using Application.Patients.Queries.GetPatientById;
using Application.Patients.Queries.GetPatients;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/patients")]
[ApiController]
[Authorize(Roles = "Doctor,Receptionist,Nurse,ClinicAdmin,SuperAdmin")]
public class PatientsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PatientsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] GetPatientsQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetPatientByIdQuery(id));
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost("{patientId:guid}/allergies")]
    public async Task<IActionResult> AddAllergy(Guid patientId, AddAllergyRequest request)
    {
        var command = new AddPatientAllergyCommand(patientId, request.AllergyName, request.Severity, request.Notes);
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = patientId }, new { id });
    }

    [HttpDelete("allergies/{allergyId:guid}")]
    public async Task<IActionResult> RemoveAllergy(Guid allergyId)
    {
        await _mediator.Send(new RemovePatientAllergyCommand(allergyId));
        return NoContent();
    }

    [HttpGet("{patientId:guid}/medical-records")]
    public async Task<IActionResult> GetMedicalRecords(Guid patientId)
    {
        var result = await _mediator.Send(new GetMedicalRecordsByPatientQuery(patientId));
        return Ok(result);
    }

    public record AddAllergyRequest(string AllergyName, string? Severity, string? Notes);
}

using MediatR;

namespace Application.Patients.Queries.GetPatientById;

public record GetPatientByIdQuery(Guid Id) : IRequest<PatientDetailDto?>;

public record AllergyDto(Guid Id, string AllergyName, string? Severity, string? Notes);

public record PatientDetailDto(
    Guid Id,
    string FirstName,
    string LastName,
    DateOnly DateOfBirth,
    string Gender,
    string? EmergencyContactName,
    string? EmergencyContactPhone,
    List<AllergyDto> Allergies);
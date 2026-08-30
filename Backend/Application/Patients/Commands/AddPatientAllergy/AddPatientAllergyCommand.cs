using MediatR;

namespace Application.Patients.Commands.AddPatientAllergy;

public record AddPatientAllergyCommand(
    Guid PatientId,
    string AllergyName,
    string? Severity,
    string? Notes
) : IRequest<Guid>;

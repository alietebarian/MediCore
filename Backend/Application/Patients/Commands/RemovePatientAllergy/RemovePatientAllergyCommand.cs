using MediatR;

namespace Application.Patients.Commands.RemovePatientAllergy;

public record RemovePatientAllergyCommand(Guid AllergyId) : IRequest;


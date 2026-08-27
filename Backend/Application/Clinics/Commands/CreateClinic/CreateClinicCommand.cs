using MediatR;

namespace Application.Clinics.Commands.CreateClinic;

public record CreateClinicCommand(
    string Name,
    string Address,
    string PhoneNumber,
    string Email
) : IRequest<Guid>;

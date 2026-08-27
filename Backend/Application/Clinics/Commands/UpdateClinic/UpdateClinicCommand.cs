using MediatR;

namespace Application.Clinics.Commands.UpdateClinic;

public record UpdateClinicCommand(
    Guid Id,
    string Name,
    string Address,
    string PhoneNumber,
    string Email,
    bool IsActive
) : IRequest;

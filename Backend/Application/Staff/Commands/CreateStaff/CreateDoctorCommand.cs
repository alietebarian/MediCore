using MediatR;

namespace Application.Staff.Commands.CreateStaff;

public record CreateDoctorCommand
    (string Email, string Password, string FullName, Guid SpecialtyId, string LicenseNumber, List<Guid> ClinicIds) : IRequest;

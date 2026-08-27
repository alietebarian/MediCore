using Domain.Entities;
using MediatR;

namespace Application.Staff.Commands.CreateClinicStaff;

public record CreateClinicStaffCommand(
    string Email,
    string Password,
    string FullName,
    StaffRole Role,
    Guid ClinicId
) : IRequest;

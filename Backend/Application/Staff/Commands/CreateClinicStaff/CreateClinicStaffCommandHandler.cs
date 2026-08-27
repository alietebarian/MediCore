using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Staff.Commands.CreateClinicStaff;

public class CreateClinicStaffCommandHandler : IRequestHandler<CreateClinicStaffCommand>
{
    private readonly IIdentityService _identityService;
    private readonly IApplicationDbContext _context;

    public CreateClinicStaffCommandHandler(IIdentityService identityService, IApplicationDbContext context)
    {
        _identityService = identityService;
        _context = context;
    }

    public async Task Handle(CreateClinicStaffCommand request, CancellationToken cancellationToken)
    {
        var roleName = request.Role.ToString();

        var(succeeded, errors, userId) = await _identityService.CreateUserAsync(
            request.Email, request.Password, request.FullName, roleName);

        if (!succeeded)
            throw new InvalidOperationException(string.Join(", ", errors));

        var staff = new ClinicStaff
        {
            UserId = userId,
            ClinicId = request.ClinicId,
            Role = request.Role
        };

        _context.ClinicStaff.Add(staff);
        await _context.SaveChangesAsync(cancellationToken);
    }
}

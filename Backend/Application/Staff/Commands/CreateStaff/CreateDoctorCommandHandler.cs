using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Staff.Commands.CreateStaff;

public class CreateDoctorCommandHandler : IRequestHandler<CreateDoctorCommand>
{
    private readonly IIdentityService _identityService;
    private readonly IApplicationDbContext _context;

    public CreateDoctorCommandHandler(IIdentityService identityService, IApplicationDbContext context)
    {
        _identityService = identityService;
        _context = context;
    }

    public async Task Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
    {
        var (succeeded, errors, userId) = await _identityService.CreateUserAsync(request.Email, request.Password, request.FullName, "Doctor");

        if (!succeeded)
            throw new Exception(string.Join(",", errors));

        var doctor = new Doctor
        {
            UserId = userId,
            SpecialtyId = request.SpecialtyId,
            LicenseNumber = request.LicenseNumber,
            FullName = request.FullName,
        };

        _context.Doctors.Add(doctor);

        foreach(var clinicId in request.ClinicIds)
        {
            var doctorClinic = new DoctorClinic
            {
                DoctorId = doctor.Id,
                ClinicId = clinicId,
            };

            _context.DoctorClinics.Add(doctorClinic);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}

using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Queries.GetPatients;

public class GetPatientsQueryHandler : IRequestHandler<GetPatientsQuery, PatientListResult>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUser;

    public GetPatientsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUser = currentUserService;
    }

    public async Task<PatientListResult> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Patients.AsNoTracking().AsQueryable();

        if (_currentUser.Roles.Contains("Doctor"))
        {
            var doctor = await _context.Doctors
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.UserId == _currentUser.UserId, cancellationToken);

            if (doctor is null)
                return new PatientListResult(new List<PatientListItemDto>(), 0, request.PageNumber, request.PageSize);

            query = query.Where(p =>
                _context.Appointments.Any(a => a.DoctorId == doctor.Id && a.PatientId == p.Id));
        }
        else if (_currentUser.Roles.Contains("Receptionist")
              || _currentUser.Roles.Contains("Nurse")
              || _currentUser.Roles.Contains("Accountant"))
        {
            var staff = await _context.ClinicStaff
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.UserId == _currentUser.UserId, cancellationToken);

            if (staff is null)
                return new PatientListResult(new List<PatientListItemDto>(), 0, request.PageNumber, request.PageSize);

            query = query.Where(p => p.PatientClinics.Any(pc => pc.ClinicId == staff.ClinicId));
        }
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(p => p.FirstName.Contains(search) || p.LastName.Contains(search));
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(p => p.FirstName)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(p => new PatientListItemDto(p.Id, p.FirstName, p.LastName, p.DateOfBirth, p.Gender.ToString()))
            .ToListAsync(cancellationToken);

        return new PatientListResult(items, totalCount, request.PageNumber, request.PageSize);
    }
}

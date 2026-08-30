using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Queries.GetPatientById;

public class GetPatientByIdQueryHandler : IRequestHandler<GetPatientByIdQuery, PatientDetailDto?>
{
    private readonly IApplicationDbContext _context;

    public GetPatientByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PatientDetailDto?> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Patients
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(
                p => new PatientDetailDto(
                p.Id, p.FirstName, p.LastName, p.DateOfBirth, p.Gender.ToString(),
                p.EmergencyContactName, p.EmergencyContactPhone,
                p.Allergies.Select(a => new AllergyDto(a.Id, a.AllergyName, a.Severity, a.Notes)).ToList()))
            .FirstOrDefaultAsync(cancellationToken);
    }
}

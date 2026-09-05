using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Doctors.Queries.GetDoctors;

public class GetDoctorsQueryHandler : IRequestHandler<GetDoctorsQuery, List<DoctorOptionDto>>
{
    private readonly IApplicationDbContext _context;

    public GetDoctorsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<DoctorOptionDto>> Handle(GetDoctorsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Doctors.AsNoTracking().Where(x => x.IsActive);

        if (request.ClinicId.HasValue)
            query = query.Where(x => x.DoctorClinics.Any(xx => xx.ClinicId == request.ClinicId.Value && xx.IsActive));

        return await query
            .OrderBy(x => x.FullName)
            .Select(x => new DoctorOptionDto(x.Id, x.FullName, x.Specialty.Name))
            .ToListAsync(cancellationToken);
    }
}

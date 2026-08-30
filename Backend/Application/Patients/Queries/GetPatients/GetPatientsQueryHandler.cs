using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Queries.GetPatients;

public class GetPatientsQueryHandler : IRequestHandler<GetPatientsQuery, PatientListResult>
{
    private readonly IApplicationDbContext _context;

    public GetPatientsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PatientListResult> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Patients.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(p =>
                p.FirstName.Contains(search) || p.LastName.Contains(search));
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(p => p.FirstName)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select((p => new PatientListItemDto(
                p.Id, p.FirstName, p.LastName, p.DateOfBirth, p.Gender.ToString())))
             .ToListAsync(cancellationToken);

        return new PatientListResult(items, totalCount, request.PageNumber, request.PageSize);
    }
}

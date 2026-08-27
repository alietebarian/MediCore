using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Clinics.Queries.GetClinics;

public class GetClinicsQueryHandler : IRequestHandler<GetClinicsQuery, PaginatedList<ClinicDto>>
{
    private readonly IApplicationDbContext _context;

    public GetClinicsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<ClinicDto>> Handle(GetClinicsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Clinics
            .AsNoTracking()
            .OrderBy(c => c.Name);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => new ClinicDto(c.Id, c.Name, c.Address, c.PhoneNumber, c.Email, c.IsActive))
            .ToListAsync(cancellationToken);

        return new PaginatedList<ClinicDto>(items, totalCount, request.PageNumber, request.PageSize);
    }
}

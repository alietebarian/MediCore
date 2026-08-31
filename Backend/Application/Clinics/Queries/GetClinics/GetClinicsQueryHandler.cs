using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Clinics.Queries.GetClinics;

public class GetClinicsQueryHandler : IRequestHandler<GetClinicsQuery, PaginatedList<ClinicDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClinicsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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
            .ProjectTo<ClinicDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new PaginatedList<ClinicDto>(items, totalCount, request.PageNumber, request.PageSize);
    }
}

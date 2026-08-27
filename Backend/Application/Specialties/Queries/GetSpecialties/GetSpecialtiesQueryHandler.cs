using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Specialties.Queries.GetSpecialties;

public class GetSpecialtiesQueryHandler : IRequestHandler<GetSpecialtiesQuery, List<SpecialistyDto>>
{
    private readonly IApplicationDbContext _context;

    public GetSpecialtiesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<SpecialistyDto>> Handle(GetSpecialtiesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Specialties
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new SpecialistyDto(x.Id, x.Name))
            .ToListAsync(cancellationToken);
    }
}

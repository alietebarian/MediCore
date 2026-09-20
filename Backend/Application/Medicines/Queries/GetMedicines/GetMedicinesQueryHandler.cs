using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Medicines.Queries.GetMedicines;

public class GetMedicinesQueryHandler : IRequestHandler<GetMedicinesQuery, List<MedicineDto>>
{
    private readonly IApplicationDbContext _context;

    public GetMedicinesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<MedicineDto>> Handle(GetMedicinesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Medicines
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new MedicineDto(x.Id, x.Name, x.GenericName, x.Form))
            .ToListAsync();
    }
}

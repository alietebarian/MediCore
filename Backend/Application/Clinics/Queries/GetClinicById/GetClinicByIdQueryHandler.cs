using Application.Clinics.Queries.GetClinics;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Clinics.Queries.GetClinicById;

public class GetClinicByIdQueryHandler : IRequestHandler<GetClinicByIdQuery, ClinicDto?>
{
    private readonly IApplicationDbContext _context;

    public GetClinicByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ClinicDto?> Handle(GetClinicByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Clinics
            .AsNoTracking()
            .Where(x => x.Id == request.Id)
            .Select(x => new ClinicDto(x.Id, x.Name, x.Address, x.PhoneNumber, x.Email, x.IsActive))
            .FirstOrDefaultAsync(cancellationToken);
    }
}

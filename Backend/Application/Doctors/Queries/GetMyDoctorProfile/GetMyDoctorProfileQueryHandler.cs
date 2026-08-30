using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Doctors.Queries.GetMyDoctorProfile;

public class GetMyDoctorProfileQueryHandler : IRequestHandler<GetMyDoctorProfileQuery, MyDoctorProfileDto?>
{
    private readonly IApplicationDbContext _context;

    public GetMyDoctorProfileQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<MyDoctorProfileDto?> Handle(GetMyDoctorProfileQuery request, CancellationToken cancellationToken)
    {
        return await _context.Doctors
            .AsNoTracking()
            .Where(x => x.UserId  == request.UserId)
            .Select(d => new MyDoctorProfileDto(d.Id, d.LicenseNumber, d.Specialty.Name))
            .FirstOrDefaultAsync(cancellationToken);
    }
}

using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prescriptions.Queries.GetPrescriptionsByMedicalRecord;

public class GetPrescriptionsByMedicalRecordQueryHandler
    : IRequestHandler<GetPrescriptionsByMedicalRecordQuery, List<PrescriptionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetPrescriptionsByMedicalRecordQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<PrescriptionDto>> Handle(
        GetPrescriptionsByMedicalRecordQuery request, CancellationToken cancellationToken)
    {
        return await _context.Prescriptions
            .AsNoTracking()
            .Where(p => p.MedicalRecordId == request.MedicalRecordId)
            .ProjectTo<PrescriptionDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}

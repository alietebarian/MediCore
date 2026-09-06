using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.MedicalRecords.Queries.GetMedicalRecordsByPatient;

public class GetMedicalRecordsByPatientQueryHandler 
    : IRequestHandler<GetMedicalRecordsByPatientQuery, List<MedicalRecordDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMedicalRecordsByPatientQueryHandler(IMapper mapper, IApplicationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<List<MedicalRecordDto>> Handle(GetMedicalRecordsByPatientQuery request, CancellationToken cancellationToken)
    {
        return await _context.MedicalRecords
            .AsNoTracking()
            .Where(x => x.PatientId == request.PatientId)
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<MedicalRecordDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}

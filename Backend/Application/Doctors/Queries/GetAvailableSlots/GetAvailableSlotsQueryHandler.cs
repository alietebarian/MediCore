using Application.Common.Interfaces;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Doctors.Queries.GetAvailableSlots;

public class GetAvailableSlotsQueryHandler : IRequestHandler<GetAvailableSlotsQuery, List<TimeSlotDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly DoctorAvailabilityService _availabilityService;

    public GetAvailableSlotsQueryHandler(IApplicationDbContext context, DoctorAvailabilityService availabilityService)
    {
        _context = context;
        _availabilityService = availabilityService;
    }

    public async Task<List<TimeSlotDto>> Handle(GetAvailableSlotsQuery request, CancellationToken cancellationToken)
    {
        var workingHours = await _context.DoctorWorkingHours
            .AsNoTracking()
            .Where(x => x.DoctorId == request.DoctorId && x.ClinicId == request.ClinicId)
            .ToListAsync(cancellationToken);

        var timeOffs = await _context.DoctorTimeOffs
            .AsNoTracking()
            .Where(x => x.DoctorId == request.DoctorId && x.Date == request.Date)
            .ToListAsync(cancellationToken);

        var existingAppointments = new List<(TimeOnly Start, TimeOnly End)>();

        var availableSlots = _availabilityService.GetAvailableSlots(
            workingHours, timeOffs, existingAppointments, request.ClinicId, request.Date);

        return availableSlots.Select(s => new TimeSlotDto(s.StartTime, s.EndTime)).ToList();
    }
}

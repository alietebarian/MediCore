using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Doctors.Commands.CreateDoctorWorkingHour;

public class CreateDoctorWorkingHourCommandHandler : IRequestHandler<CreateDoctorWorkingHourCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateDoctorWorkingHourCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateDoctorWorkingHourCommand request, CancellationToken cancellationToken)
    {
        if (request.StartTime >= request.EndTime)
            throw new InvalidOperationException("Start time must be before end time.");

        var workingHour = new DoctorWorkingHour
        {
            DoctorId = request.DoctorId,
            ClinicId = request.ClinicId,
            DayOfWeek = request.DayOfWeek,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            SlotDurationMinutes = request.SlotDurationMinutes,
        };

        _context.DoctorWorkingHours.Add(workingHour);
        await _context.SaveChangesAsync(cancellationToken);

        return workingHour.Id;
    }
}

using MediatR;

namespace Application.Doctors.Commands.CreateDoctorWorkingHour;

public record CreateDoctorWorkingHourCommand(
    Guid DoctorId,
    Guid ClinicId,
    DayOfWeek DayOfWeek,
    TimeOnly StartTime,
    TimeOnly EndTime,
    int SlotDurationMinutes = 30
) : IRequest<Guid>;

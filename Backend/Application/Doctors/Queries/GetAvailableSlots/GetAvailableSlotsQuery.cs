using MediatR;

namespace Application.Doctors.Queries.GetAvailableSlots;

public record GetAvailableSlotsQuery(Guid DoctorId, Guid ClinicId, DateOnly Date) : IRequest<List<TimeSlotDto>>;

public record TimeSlotDto(TimeOnly StartTime, TimeOnly EndTime);
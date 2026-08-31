using MediatR;

namespace Application.Appointments.Commands.CreateAppointment;

public record CreateAppointmentCommand(
     Guid DoctorId,
    Guid PatientId,
    Guid ClinicId,
    DateOnly Date,
    TimeOnly StartTime,
    TimeOnly EndTime,
    string? Notes
) : IRequest<Guid>;

using MediatR;

namespace Application.Appointments.Queries.GetAppointments;

public record GetAppointmentsQuery(
    Guid? DoctorId = null,
    Guid? PatientId = null,
    DateOnly? Date = null
) : IRequest<List<AppointmentDto>>;


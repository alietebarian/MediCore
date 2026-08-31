using Domain.Entities;

namespace Application.Appointments.Queries.GetAppointments;

public record AppointmentDto
(
    Guid Id,
    Guid DoctorId,
    string DoctorName,
    Guid PatientId,
    string PatientName,
    Guid ClinicId,
    string ClinicName,
    DateOnly Date,
    TimeOnly StartTime,
    TimeOnly EndTime,
    AppointmentStatus Status,
    string? Notes);

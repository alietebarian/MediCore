using Domain.Entities;

namespace Application.Appointments.Queries.GetAppointments;

public record AppointmentDto
{
    public Guid Id { get; init; }
    public Guid DoctorId { get; init; }
    public string DoctorName { get; init; } = default!;
    public Guid PatientId { get; init; }
    public string PatientName { get; init; } = default!;
    public Guid ClinicId { get; init; }
    public string ClinicName { get; init; } = default!;
    public DateOnly Date { get; init; }
    public TimeOnly StartTime { get; init; }
    public TimeOnly EndTime { get; init; }
    public AppointmentStatus Status { get; init; }
    public string? Notes { get; init; }
}

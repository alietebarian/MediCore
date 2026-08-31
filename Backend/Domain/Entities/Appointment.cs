namespace Domain.Entities;

public enum AppointmentStatus
{
    Pending,
    Confirmed,
    CheckedIn,
    Completed,
    Cancelled,
    NoShow
}

public class Appointment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DoctorId { get; set; }
    public Guid PatientId { get; set; }
    public Guid ClinicId { get; set; }
    public DateOnly Date { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Doctor Doctor { get; set; } = null!;
    public Patient Patient { get; set; } = null!;
    public Clinic Clinic { get; set; } = null!;
}

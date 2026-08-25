namespace Domain.Entities;

public class DoctorClinic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DoctorId { get; set; }
    public Guid ClinicId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Doctor Doctor { get; set; } = default!;
    public Clinic Clinic { get; set; } = default!;
}

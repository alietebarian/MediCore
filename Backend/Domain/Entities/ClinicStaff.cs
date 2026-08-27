namespace Domain.Entities;

public enum StaffRole
{
    Receptionist,
    Nurse,
    Accountant
}

public class ClinicStaff
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid ClinicId { get; set; }
    public StaffRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Clinic Clinic { get; set; } = default!;
}

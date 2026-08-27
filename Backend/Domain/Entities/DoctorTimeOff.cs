namespace Domain.Entities;

public class DoctorTimeOff
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DoctorId { get; set; }
    public DateOnly Date { get; set; }
    public string? Reason { get; set; }

    // Navigation
    public Doctor Doctor { get; set; } = null!;
}

namespace Domain.Entities;

public class DoctorWorkingHour
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DoctorId { get; set; }
    public Guid ClinicId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public int SlotDurationMinutes { get; set; } = 30;

    // Navigation
    public Doctor Doctor { get; set; } = default!;
    public Clinic Clinic { get; set; } = default!;
}

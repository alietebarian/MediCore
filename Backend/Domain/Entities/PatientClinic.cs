namespace Domain.Entities;

public class PatientClinic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PatientId { get; set; }
    public Guid ClinicId { get; set; }
    public DateTime? FirstVisitDate { get; set; }

    // Navigation
    public Patient Patient { get; set; } = default!;
    public Clinic Clinic { get; set; } = default!;
}

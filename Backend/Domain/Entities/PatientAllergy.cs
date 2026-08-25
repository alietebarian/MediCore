namespace Domain.Entities;

public class PatientAllergy
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PatientId { get; set; }
    public string AllergyName { get; set; } = null!;
    public string? Severity { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Patient Patient { get; set; } = default!;
}

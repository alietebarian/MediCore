namespace Domain.Entities;

public enum Gender
{
    Male,
    Female,
    Other
}

public class Patient
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? UserId { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateOnly DateOfBirth { get; set; }
    public Gender Gender { get; set; }
    public string? EmergencyContactName { get; set; }
    public string? EmergencyContactPhone { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ICollection<PatientClinic> PatientClinics { get; set; } = new List<PatientClinic>();
    public ICollection<PatientAllergy> Allergies { get; set; } = new List<PatientAllergy>();
}

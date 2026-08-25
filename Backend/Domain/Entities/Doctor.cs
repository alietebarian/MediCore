namespace Domain.Entities;

public class Doctor
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid SpecialtyId { get; set; }
    public string LicenseNumber { get; set; } = null!;
    public string? Bio { get; set; }
    public string? ProfileImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Specialty Specialty { get; set; } = default!;
    public ICollection<DoctorClinic> DoctorClinics { get; set; } = new List<DoctorClinic>();
}

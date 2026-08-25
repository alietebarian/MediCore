namespace Domain.Entities;

public class Clinic
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<DoctorClinic> DoctorClinics { get; set; } = new List<DoctorClinic>();
    public ICollection<PatientClinic> PatientClinics { get; set; } = new List<PatientClinic>();
}

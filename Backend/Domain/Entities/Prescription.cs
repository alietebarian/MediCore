namespace Domain.Entities;

public class Prescription
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MedicalRecordId { get; set; }
    public Guid MedicineId { get; set; }
    public string Dosage { get; set; } = null!;
    public string Frequency { get; set; } = null!; // مثلاً "هر ۸ ساعت"
    public string Duration { get; set; } = null!;
    public string? Instructions { get; set; } // مثلاً "بعد از غذا مصرف شود"

    public MedicalRecord MedicalRecord { get; set; } = null!;
    public Medicine Medicine { get; set; } = null!;
}

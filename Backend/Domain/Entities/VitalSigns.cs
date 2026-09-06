namespace Domain.Entities;

public class VitalSigns
{
    public decimal? Temperature { get; set; }
    public int? HeartRate { get; set; }
    public int? BloodPressureSystolic { get; set; }
    public int? BloodPressureDiastolic { get; set; }
    public decimal? WeightKg { get; set; }
}

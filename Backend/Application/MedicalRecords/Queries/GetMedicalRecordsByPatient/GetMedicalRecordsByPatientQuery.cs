using MediatR;

namespace Application.MedicalRecords.Queries.GetMedicalRecordsByPatient;

public record GetMedicalRecordsByPatientQuery(Guid PatientId) : IRequest<List<MedicalRecordDto>>;

public record VitalSignsResponseDto(
    decimal? Temperature,
    int? HeartRate,
    int? BloodPressureSystolic,
    int? BloodPressureDiastolic,
    decimal? WeightKg);

public record MedicalRecordDto
{
    public Guid Id { get; init; }
    public Guid AppointmentId { get; init; }
    public string DoctorName { get; init; } = default!;
    public DateOnly VisitDate { get; init; }
    public string Symptoms { get; init; } = default!;
    public string Diagnosis { get; init; } = default!;
    public string? Notes { get; init; }
    public VitalSignsResponseDto? VitalSigns { get; init; }
    public DateTime CreatedAt { get; init; }
}
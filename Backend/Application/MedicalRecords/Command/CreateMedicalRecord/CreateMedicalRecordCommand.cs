using MediatR;

namespace Application.MedicalRecords.Command.CreateMedicalRecord;

public record VitalSignsDto(
    decimal? Temperature,
    int? HeartRate,
    int? BloodPressureSystolic,
    int? BloodPressureDiastolic,
    decimal? WeightKg);

public record CreateMedicalRecordCommand(
    Guid AppointmentId,
    string Symptoms,
    string Diagnosis,
    string? Notes,
    VitalSignsDto? VitalSigns) : IRequest<Guid>;

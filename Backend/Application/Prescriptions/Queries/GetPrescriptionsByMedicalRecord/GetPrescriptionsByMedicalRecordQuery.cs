using MediatR;

namespace Application.Prescriptions.Queries.GetPrescriptionsByMedicalRecord;

public record GetPrescriptionsByMedicalRecordQuery(Guid MedicalRecordId) : IRequest<List<PrescriptionDto>>;

public record PrescriptionDto
{
    public Guid Id { get; init; }
    public string MedicineName { get; init; } = default!;
    public string? MedicineForm { get; init; }
    public string Dosage { get; init; } = default!;
    public string Frequency { get; init; } = default!;
    public string Duration { get; init; } = default!;
    public string? Instructions { get; init; }
}
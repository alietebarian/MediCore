using MediatR;

namespace Application.Prescriptions.Commands.CreatePrescription;

public record CreatePrescriptionCommand(
    Guid MedicalRecordId,
    Guid MedicineId,
    string Dosage,
    string Frequency,
    string Duration,
    string? Instructions) : IRequest<Guid>;
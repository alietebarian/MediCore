using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Prescriptions.Commands.CreatePrescription;

public class CreatePrescriptionCommandHandler : IRequestHandler<CreatePrescriptionCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreatePrescriptionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreatePrescriptionCommand request, CancellationToken cancellationToken)
    {
        var medicalRecordExists = await _context.MedicalRecords
            .AnyAsync(mr => mr.Id == request.MedicalRecordId, cancellationToken);

        if (!medicalRecordExists)
            throw new NotFoundException(nameof(MedicalRecord), request.MedicalRecordId);

        var medicineExists = await _context.Medicines
            .AnyAsync(m => m.Id == request.MedicineId, cancellationToken);

        if (!medicineExists)
            throw new NotFoundException(nameof(Medicine), request.MedicineId);

        var prescription = new Prescription
        {
            MedicalRecordId = request.MedicalRecordId,
            MedicineId = request.MedicineId,
            Dosage = request.Dosage,
            Frequency = request.Frequency,
            Duration = request.Duration,
            Instructions = request.Instructions,
        };

        _context.Prescriptions.Add(prescription);
        await _context.SaveChangesAsync(cancellationToken);

        return prescription.Id;
    }
}

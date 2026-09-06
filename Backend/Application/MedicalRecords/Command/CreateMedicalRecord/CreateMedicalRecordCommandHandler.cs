using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.MedicalRecords.Command.CreateMedicalRecord;

public class CreateMedicalRecordCommandHandler : IRequestHandler<CreateMedicalRecordCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly AppointmentStatusTransitionService _transitionService;

    public CreateMedicalRecordCommandHandler(AppointmentStatusTransitionService transitionService, IApplicationDbContext context)
    {
        _transitionService = transitionService;
        _context = context;
    }

    public async Task<Guid> Handle(CreateMedicalRecordCommand request, CancellationToken cancellationToken)
    {
        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(x => x.Id == request.AppointmentId, cancellationToken);

        if (appointment is null)
            throw new NotFoundException(nameof(Appointment), request.AppointmentId);

        if (!_transitionService.IsTransitionAllowed(appointment.Status, AppointmentStatus.Completed))
            throw new ConflictException(
                $"Cannot complete a visit for an appointment with status '{appointment.Status}'.");

        var alreadyHasRecord = await _context.MedicalRecords
            .AnyAsync(x => x.AppointmentId == request.AppointmentId, cancellationToken);

        if (alreadyHasRecord)
            throw new ConflictException("A medical record already exists for this appointment.");

        var record = new MedicalRecord
        {
            AppointmentId = appointment.Id,
            DoctorId = appointment.DoctorId,
            PatientId = appointment.PatientId,
            Symptoms = request.Symptoms,
            Diagnosis = request.Diagnosis,
            Notes = request.Notes,
            VitalSigns = request.VitalSigns is null ? null : new VitalSigns
            {
                Temperature = request.VitalSigns.Temperature,
                HeartRate = request.VitalSigns.HeartRate,
                BloodPressureSystolic = request.VitalSigns.BloodPressureSystolic,
                BloodPressureDiastolic = request.VitalSigns.BloodPressureDiastolic,
                WeightKg = request.VitalSigns.WeightKg,
            }
        };

        _context.MedicalRecords.Add(record);
        appointment.Status = AppointmentStatus.Completed;
        await _context.SaveChangesAsync(cancellationToken);

        return record.Id;
    }
}

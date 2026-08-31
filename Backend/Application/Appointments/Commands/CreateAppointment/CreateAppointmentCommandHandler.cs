using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Appointments.Commands.CreateAppointment;

public class CreateAppointmentCommandHandler : IRequestHandler<CreateAppointmentCommand, Guid>
{
    private readonly  IApplicationDbContext _context;
    private readonly DoctorAvailabilityService _availabilityService;

    public CreateAppointmentCommandHandler(IApplicationDbContext context, DoctorAvailabilityService availabilityService)
    {
        _context = context;
        _availabilityService = availabilityService;
    }

    public async Task<Guid> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
    {
        var workingHours = await _context.DoctorWorkingHours
            .AsNoTracking()
            .Where(w => w.DoctorId == request.DoctorId && w.ClinicId == request.ClinicId)
            .ToListAsync(cancellationToken);

        var timeOffs = await _context.DoctorTimeOffs
            .AsNoTracking()
            .Where(t => t.DoctorId == request.DoctorId && t.Date == request.Date)
            .ToListAsync(cancellationToken);

        var existingAppointments = await _context.Appointments
            .AsNoTracking()
            .Where(a => a.DoctorId == request.DoctorId
                     && a.ClinicId == request.ClinicId
                     && a.Date == request.Date
                     && a.Status != AppointmentStatus.Cancelled)
            .Select(a => new ValueTuple<TimeOnly, TimeOnly>(a.StartTime, a.EndTime))
            .ToListAsync(cancellationToken);

        var availableSlots = _availabilityService.GetAvailableSlots(
            workingHours, timeOffs, existingAppointments, request.ClinicId, request.Date);

        var isSlotAvailable = availableSlots.Any(s =>
            s.StartTime == request.StartTime && s.EndTime == request.EndTime);

        if (!isSlotAvailable)
            throw new ConflictException("The requested time slot is not available.");

        var alreadyBooked = await _context.Appointments
            .AnyAsync(a =>
                a.DoctorId == request.DoctorId &&
                a.ClinicId == request.ClinicId &&
                a.Date == request.Date &&
                a.StartTime == request.StartTime &&
                a.Status != AppointmentStatus.Cancelled,
                cancellationToken);

        if (alreadyBooked)
            throw new ConflictException("This time slot has just been booked by someone else.");

        var appointment = new Appointment
        {
            DoctorId = request.DoctorId,
            PatientId = request.PatientId,
            ClinicId = request.ClinicId,
            Date = request.Date,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Notes = request.Notes,
            Status = AppointmentStatus.Pending,
        };

        _context.Appointments.Add(appointment);

        try
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            throw new ConflictException("This time slot was just booked by someone else. Please choose another time.");
        }

        return appointment.Id;
    }
}

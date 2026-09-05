using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Appointments.Commands.UpdateAppointmentStatus;

public class UpdateAppointmentStatusCommandHandler : IRequestHandler<UpdateAppointmentStatusCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly AppointmentStatusTransitionService _transitionService;

    public UpdateAppointmentStatusCommandHandler(IApplicationDbContext context, AppointmentStatusTransitionService transitionService)
    {
        _context = context;
        _transitionService = transitionService;
    }

    public async Task Handle(UpdateAppointmentStatusCommand request, CancellationToken cancellationToken)
    {
        var appointment = await _context.Appointments
            .FirstOrDefaultAsync(x => x.Id == request.AppointmentId, cancellationToken);

        if (appointment is null)
            throw new NotFoundException(nameof(Appointment), request.AppointmentId);

        if (!_transitionService.IsTransitionAllowed(appointment.Status, request.NewStatus))
            throw new ConflictException(
                $"Cannot transition appointment from '{appointment.Status}' to '{request.NewStatus}'.");

        appointment.Status = request.NewStatus;
        await _context.SaveChangesAsync(cancellationToken);
    }
}

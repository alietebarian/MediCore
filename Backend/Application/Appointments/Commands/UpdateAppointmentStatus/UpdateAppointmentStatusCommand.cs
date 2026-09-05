using Domain.Entities;
using MediatR;

namespace Application.Appointments.Commands.UpdateAppointmentStatus;

public record UpdateAppointmentStatusCommand(Guid AppointmentId, AppointmentStatus NewStatus) : IRequest;
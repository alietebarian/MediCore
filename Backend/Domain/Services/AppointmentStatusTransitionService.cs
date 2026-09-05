using Domain.Entities;

namespace Domain.Services;

public class AppointmentStatusTransitionService
{
    private static readonly Dictionary<AppointmentStatus, AppointmentStatus[]> AllowedTransitions = new()
    {
        [AppointmentStatus.Pending] = new[] { AppointmentStatus.Confirmed, AppointmentStatus.Cancelled },
        [AppointmentStatus.Confirmed] = new[] { AppointmentStatus.CheckedIn, AppointmentStatus.Cancelled, AppointmentStatus.NoShow },
        [AppointmentStatus.CheckedIn] = new[] { AppointmentStatus.Completed },
        [AppointmentStatus.Completed] = Array.Empty<AppointmentStatus>(),
        [AppointmentStatus.Cancelled] = Array.Empty<AppointmentStatus>(),
        [AppointmentStatus.NoShow] = Array.Empty<AppointmentStatus>(),
    };

    public bool IsTransitionAllowed(AppointmentStatus from, AppointmentStatus to)
    {
        return AllowedTransitions.TryGetValue(from, out var allowed) && allowed.Contains(to);
    }
}

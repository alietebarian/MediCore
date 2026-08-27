using Domain.Entities;

namespace Domain.Services;

public record TimeSlot(TimeOnly StartTime, TimeOnly EndTime);

public class DoctorAvailabilityService
{
    public List<TimeSlot> GetAvailableSlots(
        List<DoctorWorkingHour> workingHours,
        List<DoctorTimeOff> timeOffs,
        List<(TimeOnly Start, TimeOnly End)> existingAppointments,
        Guid clinicId,
        DateOnly date)
    {
        // ۱. اگه پزشک برای این تاریخ خاص مرخصی ثبت کرده، هیچ Slot ای موجود نیست
        var isOnTimeOff = timeOffs.Any(t => t.Date == date);
        if (isOnTimeOff)
            return new List<TimeSlot>();

        // ۲. الگوی کاری مربوط به این روز هفته + این کلینیک خاص رو پیدا کن
        var workingHour = workingHours.FirstOrDefault(w =>
            w.ClinicId == clinicId && w.DayOfWeek == date.DayOfWeek);

        if (workingHour is null)
            return new List<TimeSlot>(); // پزشک اصلاً این روز در این کلینیک کار نمی‌کنه

        // ۳. بازهٔ کاری رو به Slotهای کوچک‌تر تقسیم کن
        var allSlots = new List<TimeSlot>();
        var current = workingHour.StartTime;

        while (current.AddMinutes(workingHour.SlotDurationMinutes) <= workingHour.EndTime)
        {
            var slotEnd = current.AddMinutes(workingHour.SlotDurationMinutes);
            allSlots.Add(new TimeSlot(current, slotEnd));
            current = slotEnd;
        }

        // ۴. Slotهایی که با یک Appointment موجود تداخل دارن رو حذف کن
        var availableSlots = allSlots
            .Where(slot => !existingAppointments.Any(appt =>
                slot.StartTime < appt.End && appt.Start < slot.EndTime))
            .ToList();

        return availableSlots;
    }
}
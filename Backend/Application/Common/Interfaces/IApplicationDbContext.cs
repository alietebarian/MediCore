using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Clinic> Clinics { get; }
    DbSet<Doctor> Doctors { get; }
    DbSet<Patient> Patients { get; }
    DbSet<PatientAllergy> PatientAllergies { get; }
    DbSet<DoctorClinic> DoctorClinics { get; }
    DbSet<PatientClinic> PatientClinics { get; }
    DbSet<Specialty> Specialties { get; }
    DbSet<ClinicStaff> ClinicStaff {  get; }
    DbSet<DoctorWorkingHour> DoctorWorkingHours { get; }
    DbSet<DoctorTimeOff> DoctorTimeOffs { get; }
    DbSet<Appointment> Appointments { get; }
    DbSet<MedicalRecord> MedicalRecords { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

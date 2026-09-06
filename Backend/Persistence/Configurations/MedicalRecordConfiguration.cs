using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class MedicalRecordConfiguration : IEntityTypeConfiguration<MedicalRecord>
{
    public void Configure(EntityTypeBuilder<MedicalRecord> builder)
    {
        builder.ToTable("MedicalRecords");
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Symptoms).IsRequired().HasMaxLength(2000);
        builder.Property(m => m.Diagnosis).IsRequired().HasMaxLength(2000);
        builder.Property(m => m.Notes).HasMaxLength(2000);

        builder.OwnsOne(x => x.VitalSigns, vs =>
        {
            vs.Property(v => v.Temperature).HasColumnName("VitalSigns_Temperature").HasPrecision(4, 1);
            vs.Property(v => v.HeartRate).HasColumnName("VitalSigns_HeartRate");
            vs.Property(v => v.BloodPressureSystolic).HasColumnName("VitalSigns_BpSystolic");
            vs.Property(v => v.BloodPressureDiastolic).HasColumnName("VitalSigns_BpDiastolic");
            vs.Property(v => v.WeightKg).HasColumnName("VitalSigns_WeightKg").HasPrecision(5, 2);
        });

        builder.HasIndex(m => m.AppointmentId).IsUnique();

        builder.HasOne(m => m.Appointment)
            .WithMany()
            .HasForeignKey(m => m.AppointmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.Doctor)
            .WithMany()
            .HasForeignKey(m => m.DoctorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.Patient)
            .WithMany()
            .HasForeignKey(m => m.PatientId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

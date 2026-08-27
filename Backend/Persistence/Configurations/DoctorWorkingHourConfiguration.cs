using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class DoctorWorkingHourConfiguration : IEntityTypeConfiguration<DoctorWorkingHour>
{
    public void Configure(EntityTypeBuilder<DoctorWorkingHour> builder)
    {
        builder.ToTable("DoctorWorkingHours");
        builder.HasKey(w => w.Id);

        builder.HasOne(w => w.Doctor)
            .WithMany()
            .HasForeignKey(w => w.DoctorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(w => w.Clinic)
            .WithMany()
            .HasForeignKey(w => w.ClinicId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(w => new { w.DoctorId, w.ClinicId, w.DayOfWeek }).IsUnique();
    }
}

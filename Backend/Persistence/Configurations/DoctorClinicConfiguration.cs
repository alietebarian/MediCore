using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class DoctorClinicConfiguration : IEntityTypeConfiguration<DoctorClinic>
{
    public void Configure(EntityTypeBuilder<DoctorClinic> builder)
    {
        builder.ToTable("DoctorClinics");

        builder.HasKey(dc => dc.Id);

        builder.HasOne(dc => dc.Doctor)
            .WithMany(x => x.DoctorClinics)
            .HasForeignKey(x => x.DoctorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Clinic)
            .WithMany(x => x.DoctorClinics)
            .HasForeignKey(x => x.ClinicId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(dc => new { dc.DoctorId, dc.ClinicId })
            .IsUnique();
    }
}

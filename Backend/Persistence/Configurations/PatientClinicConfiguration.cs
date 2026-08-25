using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class PatientClinicConfiguration : IEntityTypeConfiguration<PatientClinic>
{
    public void Configure(EntityTypeBuilder<PatientClinic> builder)
    {
        builder.ToTable("PatientClinics");

        builder.HasKey(pc => pc.Id);

        builder.HasOne(x => x.Patient)
            .WithMany(x => x.PatientClinics)
            .HasForeignKey(x => x.PatientId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Clinic)
            .WithMany(x => x.PatientClinics)
            .HasForeignKey(x => x.ClinicId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.PatientId, x.ClinicId })
            .IsUnique();
    }
}

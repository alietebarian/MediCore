using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class PatientConfiguration : IEntityTypeConfiguration<Patient>
{
    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.ToTable("Patients");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.EmergencyContactName)
            .HasMaxLength(100);

        builder.Property(p => p.EmergencyContactPhone)
            .HasMaxLength(20);

        builder.HasIndex(x => x.UserId)
            .IsUnique()
            .HasFilter("[UserId] IS NOT NULL");

        builder.HasMany(x => x.Allergies)
            .WithOne(x => x.Patient)
            .HasForeignKey(x => x.PatientId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

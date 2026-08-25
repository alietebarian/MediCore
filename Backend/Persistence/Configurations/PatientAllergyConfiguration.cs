using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class PatientAllergyConfiguration : IEntityTypeConfiguration<PatientAllergy>
{
    public void Configure(EntityTypeBuilder<PatientAllergy> builder)
    {
        builder.ToTable("PatientAllergies");

        builder.HasKey(e => e.Id);

        builder.Property(a => a.AllergyName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(a => a.Severity)
            .HasMaxLength(50);

        builder.Property(a => a.Notes)
            .HasMaxLength(1000);
    }
}

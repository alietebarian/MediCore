using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class SpecialtyConfiguration : IEntityTypeConfiguration<Specialty>
{
    public void Configure(EntityTypeBuilder<Specialty> builder)
    {
        builder.ToTable("Specialties");

        builder.HasKey(x => x.Id);

        builder.Property(s => s.Name)
           .IsRequired()
           .HasMaxLength(150);

        builder.Property(s => s.Description)
            .HasMaxLength(1000);

        builder.HasIndex(s => s.Name)
            .IsUnique();
    }
}

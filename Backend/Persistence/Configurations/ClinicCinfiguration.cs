using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ClinicCinfiguration : IEntityTypeConfiguration<Clinic>
{
    public void Configure(EntityTypeBuilder<Clinic> builder)
    {
        builder.ToTable("Clinics");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Address)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(c => c.PhoneNumber)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(c => c.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasIndex(c => c.Email)
            .IsUnique();
    }
}

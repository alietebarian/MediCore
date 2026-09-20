using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class PrescriptionConfiguration : IEntityTypeConfiguration<Prescription>
{
    public void Configure(EntityTypeBuilder<Prescription> builder)
    {
        builder.ToTable("Prescriptions");
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Dosage).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Frequency).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Duration).IsRequired().HasMaxLength(100);
        builder.Property(p => p.Instructions).HasMaxLength(500);

        builder.HasOne(p => p.MedicalRecord)
            .WithMany()
            .HasForeignKey(p => p.MedicalRecordId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(p => p.Medicine)
            .WithMany()
            .HasForeignKey(p => p.MedicineId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

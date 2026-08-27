using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class DoctorTimeOffConfiguration : IEntityTypeConfiguration<DoctorTimeOff>
{
    public void Configure(EntityTypeBuilder<DoctorTimeOff> builder)
    {
        builder.ToTable("DoctorTimeOffs");
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Reason).HasMaxLength(500);

        builder.HasOne(t => t.Doctor)
            .WithMany()
            .HasForeignKey(t => t.DoctorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(t => new { t.DoctorId, t.Date }).IsUnique();
    }
}
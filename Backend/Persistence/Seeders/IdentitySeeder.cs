using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Identity;

namespace Persistence.Seeders;

public static class IdentitySeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        string[] roles = { "SuperAdmin", "ClinicAdmin", "Doctor", "Receptionist", "Nurse", "Accountant", "Patient" };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
        }

        const string superAdminEmail = "superadmin@medicore.local";

        var existingSuperAdmin = await userManager.FindByEmailAsync(superAdminEmail);
        if (existingSuperAdmin is null)
        {
            var superAdmin = new ApplicationUser
            {
                UserName = superAdminEmail,
                Email = superAdminEmail,
                FullName = "System Super Admin",
                EmailConfirmed = true,
            };

            // این رمز عبور فقط برای محیط توسعه (Development) است
            var result = await userManager.CreateAsync(superAdmin, "SuperAdmin@123");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(superAdmin, "SuperAdmin");
            }
        }
    }

    public static async Task SeedSpecialtiesAsync(IApplicationDbContext context)
    {
        if (!context.Specialties.Any())
        {
            var specialties = new[] { "قلب و عروق", "پوست", "اطفال", "ارتوپدی", "داخلی", "زنان و زایمان" }
                .Select(name => new Specialty { Name = name });

            context.Specialties.AddRange(specialties);
            await context.SaveChangesAsync(default);
        }
    }

    public static async Task SeedMedicinesAsync(IApplicationDbContext context)
    {
        if (!context.Medicines.Any())
        {
            var medicines = new[]
            {
                new Medicine { Name = "پاراستامول", GenericName = "Paracetamol", Form = "قرص" },
                new Medicine { Name = "ایبوپروفن", GenericName = "Ibuprofen", Form = "کپسول" },
                new Medicine { Name = "آموکسی‌سیلین", GenericName = "Amoxicillin", Form = "کپسول" },
                new Medicine { Name = "سیتریزین", GenericName = "Cetirizine", Form = "قرص" },
                new Medicine { Name = "متفورمین", GenericName = "Metformin", Form = "قرص" }
            };
            context.Medicines.AddRange(medicines);
            await context.SaveChangesAsync(default);
        }
    }
}

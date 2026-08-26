using Application.Common.Interfaces;
using Microsoft.AspNetCore.Identity;
using Persistence.Identity;

namespace Persistence.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public IdentityService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<(bool Succeeded, string[] Errors, Guid UserId)> CreateUserAsync(string email, string password, string fullName, string role)
    {
        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            FullName = fullName,
        };

        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
            return (false, result.Errors.Select(e => e.Description).ToArray(), Guid.Empty);

        await _userManager.AddToRoleAsync(user, role);

        return (true, Array.Empty<string>(), user.Id);
    }

    public async Task<(bool Succeeded, Guid UserId, string FullName, IList<string> Roles)> ValidateCredentialsAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null)
            return (false, Guid.Empty, string.Empty, new List<string>());

        var isValid = await _userManager.CheckPasswordAsync(user, password);

        if (!isValid)
            return (false, Guid.Empty, string.Empty, new List<string>());

        var roles = await _userManager.GetRolesAsync(user);

        return (true, user.Id, user.FullName, roles);
    }
}

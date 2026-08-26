namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<(bool Succeeded, string[] Errors, Guid UserId)> CreateUserAsync(
        string email, string password, string fullName, string role);

    Task<(bool Succeeded, Guid UserId, string FullName, IList<string> Roles)> ValidateCredentialsAsync(
        string email, string password);
}

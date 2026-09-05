namespace Application.Common.Interfaces;

public interface ICurrentUserService
{
    Guid? UserId { get; }
    IList<string> Roles { get; }
}

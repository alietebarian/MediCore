namespace Application.Auth.Common;

public record AuthResponseDto(string token, Guid UserId, string FullName, string Role);

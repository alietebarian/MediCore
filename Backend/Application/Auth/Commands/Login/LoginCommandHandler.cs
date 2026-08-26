using Application.Auth.Common;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponseDto>
{
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(IIdentityService identityService, IJwtTokenGenerator jwtTokenGenerator)
    {
        _identityService = identityService;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var (succeeded, userId, fullName, roles) = await _identityService.ValidateCredentialsAsync(
            request.Email, request.Password);

        if (!succeeded)
            throw new UnauthorizedAccessException("Invalid email or password.");

        var token = _jwtTokenGenerator.GenerateToken(userId, request.Email, fullName, roles);

        return new AuthResponseDto(token, userId, fullName, roles.FirstOrDefault() ?? string.Empty);
    }
}

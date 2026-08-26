using Application.Auth.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    private readonly IIdentityService _identityService;
    private readonly IApplicationDbContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(
        IIdentityService identityService,
        IApplicationDbContext context,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _identityService = identityService;
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var fullName = $"{request.FirstName} {request.LastName}";

        var (succeeded, errors, userId) = await _identityService.CreateUserAsync(request.Email, request.Password, fullName, "Patient");

        if (!succeeded)
            throw new InvalidOperationException(string.Join(", ", errors));

        var patient = new Patient
        {
            UserId = userId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
        };

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync(cancellationToken);

        var token = _jwtTokenGenerator.GenerateToken(userId, request.Email, fullName, new List<string> { "Patient" });
        return new AuthResponseDto(token, userId, fullName, "Patient");
    }
}

using Application.Auth.Common;
using Domain.Entities;
using MediatR;

namespace Application.Auth.Commands.Register;

public record RegisterCommand(
    string Email,
    string Password,
    string FirstName,
    string LastName,
    DateOnly DateOfBirth,
    Gender Gender
) : IRequest<AuthResponseDto>;

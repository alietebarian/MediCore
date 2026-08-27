using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Clinics.Commands.CreateClinic;

public class CreateClinicCommandHandler : IRequestHandler<CreateClinicCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateClinicCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateClinicCommand request, CancellationToken cancellationToken)
    {
        var clinic = new Clinic
        {
            Name = request.Name,
            Address = request.Address,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
        };

        _context.Clinics.Add(clinic);
        await _context.SaveChangesAsync(cancellationToken);

        return clinic.Id;
    }
}

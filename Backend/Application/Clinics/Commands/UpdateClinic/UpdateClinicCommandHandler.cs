using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Clinics.Commands.UpdateClinic;

public class UpdateClinicCommandHandler : IRequestHandler<UpdateClinicCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateClinicCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateClinicCommand request, CancellationToken cancellationToken)
    {
        var clinic = await _context.Clinics.FirstOrDefaultAsync(x => x.Id == request.Id);

        if (clinic is null)
            throw new KeyNotFoundException($"Clinic with Id {request.Id} was not found.");

        clinic.Name = request.Name;
        clinic.Address = request.Address;
        clinic.PhoneNumber = request.PhoneNumber;
        clinic.Email = request.Email;
        clinic.IsActive = request.IsActive;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

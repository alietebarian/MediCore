using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Commands.RemovePatientAllergy;

public class RemovePatientAllergyCommandHandler : IRequestHandler<RemovePatientAllergyCommand>
{
    private readonly IApplicationDbContext _context;

    public RemovePatientAllergyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(RemovePatientAllergyCommand request, CancellationToken cancellationToken)
    {
        var allergy = await _context.PatientAllergies
            .FirstOrDefaultAsync(x => x.Id == request.AllergyId, cancellationToken);

        if (allergy is null)
            throw new KeyNotFoundException($"Allergy with Id {request.AllergyId} was not found.");

        _context.PatientAllergies.Remove(allergy);
        await _context.SaveChangesAsync(cancellationToken);
    }
}

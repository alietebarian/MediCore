using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Commands.AddPatientAllergy;

public class AddPatientAllergyCommandHandler : IRequestHandler<AddPatientAllergyCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public AddPatientAllergyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(AddPatientAllergyCommand request, CancellationToken cancellationToken)
    {
        var patientExists = await _context.Patients
            .AnyAsync(x => x.Id == request.PatientId, cancellationToken);

        if (!patientExists)
            throw new KeyNotFoundException($"Patient with Id {request.PatientId} was not found.");

        var allergy = new PatientAllergy
        {
            PatientId = request.PatientId,
            AllergyName = request.AllergyName,
            Severity = request.Severity,
            Notes = request.Notes,
        };

        _context.PatientAllergies.Add(allergy);
        await _context.SaveChangesAsync(cancellationToken);

        return allergy.Id;
    }
}

using Application.Clinics.Queries.GetClinics;
using MediatR;

namespace Application.Clinics.Queries.GetClinicById;

public record GetClinicByIdQuery(Guid Id) : IRequest<ClinicDto?>;

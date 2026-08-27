using MediatR;

namespace Application.Specialties.Queries.GetSpecialties;

public record GetSpecialtiesQuery : IRequest<List<SpecialistyDto>>;

public record SpecialistyDto(Guid Id, string Name);

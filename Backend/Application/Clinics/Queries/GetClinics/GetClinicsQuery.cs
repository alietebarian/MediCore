using MediatR;

namespace Application.Clinics.Queries.GetClinics;

public record GetClinicsQuery(int PageNumber = 1, int PageSize = 10) : IRequest<PaginatedList<ClinicDto>>;

public record ClinicDto(Guid Id, string Name, string Address, string PhoneNumber, string Email, bool IsActive);

public record PaginatedList<T>(List<T> Items, int TotalCount, int PageNumber, int PageSize)
{
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}
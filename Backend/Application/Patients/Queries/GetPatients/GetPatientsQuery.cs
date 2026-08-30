using MediatR;

namespace Application.Patients.Queries.GetPatients;

public record GetPatientsQuery(int PageNumber = 1, int PageSize = 10, string? Search = null) 
    : IRequest<PatientListResult>;

public record PatientListItemDto(Guid Id, string FirstName, string LastName, DateOnly DateOfBirth, string Gender);

public record PatientListResult(List<PatientListItemDto> Items, int TotalCount, int PageNumber, int PageSize)
{
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}

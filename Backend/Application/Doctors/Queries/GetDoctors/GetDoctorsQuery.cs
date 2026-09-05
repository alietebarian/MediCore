using MediatR;

namespace Application.Doctors.Queries.GetDoctors;

public record GetDoctorsQuery(Guid? ClinicId = null) : IRequest<List<DoctorOptionDto>>;

public record DoctorOptionDto(Guid Id, string FullName, string SpecialtyName);

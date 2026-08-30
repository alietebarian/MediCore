using MediatR;

namespace Application.Doctors.Queries.GetMyDoctorProfile;

public record GetMyDoctorProfileQuery(Guid UserId) : IRequest<MyDoctorProfileDto>;

public record MyDoctorProfileDto(Guid Id, string LicenseNumber, string SpecialtyName);
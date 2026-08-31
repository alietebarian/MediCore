using Application.Clinics.Queries.GetClinics;
using Application.Specialties.Queries.GetSpecialties;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Clinic, ClinicDto>();
        CreateMap<Specialty, SpecialistyDto>();
    }
}

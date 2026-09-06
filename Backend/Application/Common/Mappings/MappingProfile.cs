using Application.Appointments.Queries.GetAppointments;
using Application.Clinics.Queries.GetClinics;
using Application.MedicalRecords.Queries.GetMedicalRecordsByPatient;
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
        CreateMap<Appointment, AppointmentDto>()
            .ForMember(x => x.DoctorName, xx => xx.MapFrom(xxx => xxx.Doctor.FullName))
            .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.FirstName + " " + src.Patient.LastName))
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name));

        CreateMap<MedicalRecord, MedicalRecordDto>()
            .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.FullName))
            .ForMember(dest => dest.VisitDate, opt => opt.MapFrom(src => src.Appointment.Date))
            .ForMember(dest => dest.VitalSigns, opt => opt.MapFrom(src => src.VitalSigns));

        CreateMap<VitalSigns, VitalSignsResponseDto>();
    }
}

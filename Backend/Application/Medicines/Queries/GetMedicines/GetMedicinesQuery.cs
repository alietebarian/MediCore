using MediatR;

namespace Application.Medicines.Queries.GetMedicines;


public record GetMedicinesQuery : IRequest<List<MedicineDto>>;

public record MedicineDto(Guid Id, string Name, string? GenericName, string? Form);
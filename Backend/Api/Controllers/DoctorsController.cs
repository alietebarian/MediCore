using Application.Doctors.Commands.CreateDoctorWorkingHour;
using Application.Doctors.Queries.GetAvailableSlots;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllersک
{
    [Route("api/doctors")]
    [ApiController]
    [Authorize]
    public class DoctorsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DoctorsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{doctorId:guid}/available-slots")]
        public async Task<IActionResult> GetAvailableSlots(
        Guid doctorId,
        [FromQuery] Guid clinicId,
        [FromQuery] DateOnly date)
        {
            var result = await _mediator.Send(new GetAvailableSlotsQuery(doctorId, clinicId, date));
            return Ok(result);
        }

        [HttpPost("working-hours")]
        [Authorize(Roles = "Doctor,ClinicAdmin,SuperAdmin")]
        public async Task<IActionResult> CreateWorkingHour(CreateDoctorWorkingHourCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetAvailableSlots), new { doctorId = command.DoctorId }, new { id });
        }
    }
}

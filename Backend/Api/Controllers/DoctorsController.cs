using Application.Doctors.Commands.CreateDoctorWorkingHour;
using Application.Doctors.Queries.GetAvailableSlots;
using Application.Doctors.Queries.GetMyDoctorProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var result = await _mediator.Send(new GetMyDoctorProfileQuery(userId));
            return result is null ? NotFound("No doctor profile found for this user.") : Ok(result);
        }
    }
}

namespace Domain.Entities;

public class Medicine
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public string? GenericName { get; set; }
    public string? Form { get; set; }
}

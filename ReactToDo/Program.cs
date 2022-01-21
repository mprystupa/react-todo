using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ToDoDb>(opt => opt.UseInMemoryDatabase("ToDos"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Api is working!");

app.MapGet("/todos", async (ToDoDb db) => await db.ToDoEntries.ToListAsync());
app.MapGet("/todos/complete", async (ToDoDb db) => await db.ToDoEntries.Where(x => x.IsComplete == true).ToListAsync());
app.MapGet("/todos/{id}", async (int id, ToDoDb db) => await db.ToDoEntries.FindAsync(id) is ToDoEntry entry ? Results.Ok(entry) : Results.NotFound());
app.MapPost("/todos", async (ToDoEntry entry, ToDoDb db) =>
{
    db.ToDoEntries.Add(entry);
    await db.SaveChangesAsync();

    return Results.Created($"/todos/{entry.Id}", entry);
});
app.MapPut("/todos/{id}", async (int id, ToDoEntry entry, ToDoDb db) =>
{
    if (await db.ToDoEntries.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) is ToDoEntry entryFromDb)
    {
        entryFromDb = entry with { Id = entryFromDb.Id };

        db.ToDoEntries.Update(entryFromDb);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }

    return Results.NotFound();

});
app.MapDelete("/todos/{id}", async (int id, ToDoDb db) =>
{
    if (await db.ToDoEntries.FindAsync(id) is ToDoEntry entryFromDb)
    {
        db.ToDoEntries.Remove(entryFromDb);
        await db.SaveChangesAsync();

        return Results.Ok(entryFromDb);
    }

    return Results.NotFound();
});

app.UseHttpsRedirection();
app.Run();

public record class ToDoEntry(int Id, string Name, bool IsComplete);

public class ToDoDb : DbContext
{
    public ToDoDb(DbContextOptions<ToDoDb> options) : base(options) { }

    public DbSet<ToDoEntry> ToDoEntries => Set<ToDoEntry>();
}
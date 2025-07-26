namespace BlazorInvoiceGenerator.Utils;

public class InvoiceData
{
    public CompanyInfo? YourCompany { get; set; }
    public InvoiceInfo? Invoice { get; set; }
    public PersonInfo? BillTo { get; set; }
    public PersonInfo? ShipTo { get; set; }
    public List<ItemInfo>? Items { get; set; }
    public decimal SubTotal { get; set; }
    public decimal TaxPercentage { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal GrandTotal { get; set; }
    public string? Notes { get; set; }
    public string? SelectedCurrency { get; set; }
}

public class CompanyInfo
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}

public class InvoiceInfo
{
    public string? Number { get; set; }
    public DateTime Date { get; set; }
    public DateTime PaymentDate { get; set; }
}

public class PersonInfo
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
}

public class ItemInfo
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Model { get; set; }
    public int Quantity { get; set; }
    public decimal Amount { get; set; }
    public decimal Total { get; set; }
}

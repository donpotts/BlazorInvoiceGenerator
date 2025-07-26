using BlazorInvoiceGenerator.Utils;

namespace BlazorInvoiceGenerator.Services
{
    public class InvoiceDataService
    {
        private InvoiceData _currentInvoiceData;

        public InvoiceDataService()
        {
            _currentInvoiceData = CreateSampleData();
        }

        public InvoiceData GetCurrentInvoiceData()
        {
            return _currentInvoiceData;
        }

        public void UpdateInvoiceData(InvoiceData invoiceData)
        {
            _currentInvoiceData = invoiceData;
        }

        private InvoiceData CreateSampleData()
        {
            return new InvoiceData
            {
                YourCompany = new CompanyInfo { Name = "Sample Company", Address = "123 Main St", Phone = "555-1234" },
                Invoice = new InvoiceInfo { Number = "INV-001", Date = DateTime.Now, PaymentDate = DateTime.Now.AddDays(30) },
                BillTo = new PersonInfo { Name = "John Doe", Address = "456 Elm St", Phone = "555-5678" },
                ShipTo = new PersonInfo { Name = "Jane Smith", Address = "789 Oak St", Phone = "555-9012" },
                Items = new List<ItemInfo> { new ItemInfo { Name = "Widget", Description = "A useful widget", Quantity = 2, Amount = 10.0m, Total = 20.0m } },
                SubTotal = 20.0m,
                TaxPercentage = 5.0m,
                TaxAmount = 1.0m,
                GrandTotal = 21.0m,
                Notes = "Thank you for your business!",
                SelectedCurrency = "USD"
            };
        }
    }
}
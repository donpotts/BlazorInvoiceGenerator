# Blazor Invoice Generator

A modern, open-source web application for generating professional invoices using Blazor WebAssembly. Choose from 12+ beautifully crafted templates, customize invoice details, and export to PDF or print.

## 🚀 Features

- 12+ modern invoice templates
- Live invoice preview and editing
- PDF export and print support
- Customizable company, client, and item details
- Responsive, mobile-friendly UI
- Built with Blazor WebAssembly (.NET 9)

## 🖥️ Demo

> **Try it live:** [https://donpotts.github.io/BlazorInvoiceGenerator/]

## 🛠️ Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (for front-end tooling, optional)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/donpotts/BlazorInvoiceGenerator.git
cd BlazorInvoiceGenerator

# Restore and run
dotnet restore
dotnet run --project BlazorInvoiceGenerator.csproj
```

Open your browser at `https://localhost:5001` (or the port shown in the console).

## 📦 Project Structure

- `Components/` — Blazor components and invoice templates
- `Pages/` — Main app pages (Home, Invoice Builder, Preview, Templates)
- `Services/` — App services (e.g., InvoiceDataService)
- `Utils/` — Data models and utility classes
- `wwwroot/` — Static assets (CSS, JS, images)

## 🧩 Technologies Used
- [Blazor WebAssembly](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)
- .NET 9
- HTML2Canvas & jsPDF (for PDF export)
- Tailwind CSS/Bootstrap (UI styling)

---

Created by [Don Potts](https://www.donpotts.com) — Powered by Blazor WebAssembly
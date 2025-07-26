using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Components;
using BlazorInvoiceGenerator.Components.Templates;

namespace BlazorInvoiceGenerator.Utils
{
    public static class TemplateRegistry
    {
        private static readonly List<Type> Templates = new()
        {
            typeof(Template1),
            typeof(Template2),
            typeof(Template3),
            typeof(Template4),
            typeof(Template5),
            typeof(Template6),
            typeof(Template7),
            typeof(Template8),
            typeof(Template9),
            typeof(Template10),
            typeof(Template11),
            typeof(Template12),
            typeof(Template13) // Add Template13
        };

        public static Type GetTemplateType(int templateNumber)
        {
            return templateNumber > 0 && templateNumber <= Templates.Count
                ? Templates[templateNumber - 1]
                : Templates[0]; // Default to Template1 if not found
        }
    }
}

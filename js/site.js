// Completely rewritten print function for accurate invoice printing that matches PDF output
function printInvoiceContent(contentId, templateNumber) {
    // Find the correct template node
    let templateDiv = null;
    if (contentId.startsWith('template-preview-')) {
        templateDiv = document.getElementById(contentId);
    } else {
        const container = document.getElementById(contentId);
        if (container && typeof templateNumber === 'number') {
            templateDiv = container.querySelector(`#template-preview-${templateNumber}`);
        }
    }
    if (!templateDiv) {
        alert('Could not find the invoice template to print.');
        return;
    }

    // Find the actual invoice template within the preview container
    let invoiceTemplate = templateDiv.querySelector('[style*="width: 816px"], [style*="width:816px"], .invoice-template') || 
                         templateDiv.querySelector('div[style*="background: white"], div[style*="background:white"]') || 
                         templateDiv.firstElementChild || templateDiv;

    // Clone the template node to avoid Blazor reactivity issues
    const clone = invoiceTemplate.cloneNode(true);
    
    // Template-specific adjustments for problematic templates
    let containerWidth = 750;
    let containerHeight = 970;
    let containerPadding = 40;
    let pageMargins = '0.4in 0.5in 0.3in 0.5in';
    let printHeight = '10.3in';
    
    // Specific adjustments for problematic templates
    if (templateNumber === 2) {
        // Template 2: Missing footer - reduce height more aggressively
        containerHeight = 940;
        containerPadding = 32;
        pageMargins = '0.35in 0.5in 0.25in 0.5in';
        printHeight = '10.4in';
    } else if (templateNumber === 6) {
        // Template 6: Right side cutoff and footer issues - wider container
        containerWidth = 700;
        containerHeight = 940;
        containerPadding = 28;
        pageMargins = '0.35in 0.6in 0.25in 0.6in';
        printHeight = '10.4in';
    } else if (templateNumber === 13) {
        // Template 13: Footer text cutoff - reduce height
        containerHeight = 950;
        containerPadding = 36;
        pageMargins = '0.35in 0.5in 0.25in 0.5in';
        printHeight = '10.4in';
    }
    
    // Apply container styling with template-specific dimensions
    clone.style.cssText = `
        width: ${containerWidth}px !important;
        min-width: ${containerWidth}px !important;
        max-width: ${containerWidth}px !important;
        height: ${containerHeight}px !important;
        min-height: ${containerHeight}px !important;
        max-height: ${containerHeight}px !important;
        margin: 0 auto !important;
        padding: ${containerPadding}px !important;
        background: white !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        transform: none !important;
        scale: none !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
        font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
        display: flex !important;
        flex-direction: column !important;
        position: relative !important;
        page-break-inside: avoid !important;
    `;

    // Remove border/box-shadow/outline from all children to match PDF
    Array.from(clone.querySelectorAll('*')).forEach(el => {
        if (el.style) {
            el.style.border = 'none';
            el.style.boxShadow = 'none';
            el.style.outline = 'none';
            el.style.borderLeft = 'none';
            el.style.borderRight = 'none';
            el.style.borderTop = 'none';
            el.style.borderBottom = 'none';
        }
    });

    // Create print styles that exactly match PDF output with template-specific adjustments
    const printStyles = `
        @page {
            size: 8.5in 11in;
            margin: ${pageMargins};
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }
        
        html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        body {
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            padding: 0 !important;
        }
        
        * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
        }
        
        /* Hide scrollbars */
        ::-webkit-scrollbar { 
            display: none !important; 
        }
        
        /* Ensure the invoice template is properly sized */
        .invoice-template-print {
            width: 7.5in !important;
            max-width: 7.5in !important;
            min-width: 7.5in !important;
            height: ${printHeight} !important;
            max-height: ${printHeight} !important;
            min-height: ${printHeight} !important;
            margin: 0 auto !important;
            padding: 0.4in !important;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            transform: none !important;
            scale: none !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
            page-break-inside: avoid !important;
            font-size: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '0.88em' : '0.92em'} !important;
        }
        
        /* Template-specific header adjustments */
        .invoice-template-print h1 {
            font-size: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '2rem' : '2.2rem'} !important;
            margin: 0 0 0.75rem 0 !important;
            line-height: 1.2 !important;
        }
        
        .invoice-template-print h2 {
            font-size: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '1rem' : '1.1rem'} !important;
            margin: 0 0 0.5rem 0 !important;
            line-height: 1.2 !important;
        }
        
        .invoice-template-print h3 {
            font-size: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '0.9rem' : '0.95rem'} !important;
            margin: 0 0 0.5rem 0 !important;
            line-height: 1.2 !important;
        }
        
        /* Compact table styling but preserve readability */
        .invoice-template-print table {
            font-size: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '0.75rem' : '0.8rem'} !important;
            line-height: 1.3 !important;
        }
        
        .invoice-template-print td,
        .invoice-template-print th {
            padding: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '0.3rem 0.5rem' : '0.4rem 0.6rem'} !important;
        }
        
        /* Template-specific adjustments for padding/margins */
        .invoice-template-print div[style*="padding: 3.5rem"] {
            padding: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '1.5rem 1.2rem 1.2rem 1.2rem' : '2rem 1.5rem 1.5rem 1.5rem'} !important;
        }
        
        .invoice-template-print div[style*="padding: 2rem"] {
            padding: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '1rem' : '1.2rem'} !important;
        }
        
        .invoice-template-print div[style*="margin-bottom: 2rem"] {
            margin-bottom: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '1rem' : '1.2rem'} !important;
        }
        
        .invoice-template-print div[style*="margin-top: 2rem"] {
            margin-top: ${templateNumber === 2 || templateNumber === 6 || templateNumber === 13 ? '1rem' : '1.2rem'} !important;
        }
        
        /* Template 2 specific: Ensure footer is visible */
        ${templateNumber === 2 ? `
        .invoice-template-print > div:last-child {
            margin-top: auto !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
            font-size: 0.7rem !important;
        }
        .invoice-template-print div[style*="margin-bottom: 4rem"] {
            margin-bottom: 0.5rem !important;
        }
        ` : ''}
        
        /* Template 6 specific: Fix width and footer */
        ${templateNumber === 6 ? `
        .invoice-template-print > div {
            width: 100% !important;
            max-width: 100% !important;
        }
        .invoice-template-print div[style*="width: 760px"] {
            width: 100% !important;
            max-width: 100% !important;
        }
        .invoice-template-print div[style*="padding: 3rem"] {
            padding: 1.2rem !important;
        }
        .invoice-template-print div[style*="margin-bottom: 4rem"] {
            margin-bottom: 0.5rem !important;
        }
        .invoice-template-print h1[style*="font-size: 2.5rem"] {
            font-size: 1.6rem !important;
        }
        .invoice-template-print h2[style*="font-size: 1.25rem"] {
            font-size: 0.95rem !important;
        }
        .invoice-template-print div[style*="margin-bottom: 2rem"] {
            margin-bottom: 0.8rem !important;
        }
        ` : ''}
        
        /* Template 13 specific: Fix footer positioning */
        ${templateNumber === 13 ? `
        .invoice-template-print > div:last-child {
            margin-top: auto !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
            font-size: 0.7rem !important;
        }
        .invoice-template-print div[style*="margin-bottom: 4rem"] {
            margin-bottom: 0.5rem !important;
        }
        ` : ''}
        
        /* General footer adjustments */
        .invoice-template-print > div:last-child {
            margin-top: auto !important;
            margin-bottom: 0 !important;
        }
        
        /* Remove any borders or shadows from template content */
        .invoice-template-print * {
            border: none !important;
            box-shadow: none !important;
            outline: none !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    `;

    // Add the print class to our clone
    clone.className = (clone.className || '') + ' invoice-template-print';

    // Track if print was already initiated to prevent double print
    let printInitiated = false;

    // Open a new print window
    const printWindow = window.open('', '_blank', `width=${containerWidth},height=${containerHeight}`);
    
    if (!printWindow) {
        alert('Please allow pop-ups for printing functionality.');
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print Invoice</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/css/app.css" />
            <style>
                ${printStyles}
            </style>
        </head>
        <body>
        </body>
        </html>
    `);
    printWindow.document.close();

    // Function to handle printing
    const handlePrint = () => {
        if (printInitiated) return;
        printInitiated = true;
        
        // Clear any existing content
        while (printWindow.document.body.firstChild) {
            printWindow.document.body.removeChild(printWindow.document.body.firstChild);
        }
        
        // Add the styled clone
        printWindow.document.body.appendChild(clone);
        
        // Wait for styles to apply and fonts to load
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            
            // Close the window after a delay
            setTimeout(() => {
                try {
                    printWindow.close();
                } catch (e) {
                    // Window might already be closed by user
                }
            }, 1000);
        }, 800);
    };

    // Wait for the window to load, then inject the content and print
    if (printWindow.document.readyState === 'complete') {
        handlePrint();
    } else {
        printWindow.onload = handlePrint;
        // Fallback timeout in case onload doesn't fire
        setTimeout(() => {
            if (!printInitiated && printWindow.document.readyState === 'complete') {
                handlePrint();
            }
        }, 1500);
    }
}

// Enhanced DOM ready check for PDF generation
function waitForDOMReady() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}

// PDF Generation Function with better single-page handling
async function generatePDF(contentId, invoiceData, templateNumber) {
    await waitForDOMReady();
    return new Promise(async (resolve, reject) => {
        try {
            const content = document.getElementById(contentId);
            if (!content) {
                console.error(`Content element with ID '${contentId}' not found`);
                throw new Error('Content element not found');
            }

            // Find the invoice template within the container
            const invoiceTemplate = content.querySelector('[style*="width: 816px"], [style*="width:816px"], .invoice-template') || 
                                  content.querySelector('div[style*="background: white"], div[style*="background:white"]') || 
                                  content.firstElementChild || content;

            console.log('Found template element:', invoiceTemplate);

            // US Letter: 8.5in x 11in = 816px x 1056px at 96dpi
            // We'll use a safe content width of 800px to ensure no cutoff, and center it
            const safePxWidth = 800;
            const safePxHeight = 1030; // 800 * (11/8.5)
            const pdfMmWidth = 216; // 8.5in in mm
            const pdfMmHeight = 279; // 11in in mm

            // Create a temporary container for PDF generation
            const tempContainer = document.createElement('div');
            tempContainer.style.cssText = `
                position: absolute;
                left: -9999px;
                top: -9999px;
                width: ${safePxWidth}px;
                min-width: ${safePxWidth}px;
                max-width: ${safePxWidth}px;
                height: ${safePxHeight}px;
                min-height: ${safePxHeight}px;
                max-height: ${safePxHeight}px;
                background: white;
                padding: 0;
                margin: 0;
                font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                border: none !important;
                box-shadow: none !important;
                outline: none !important;
            `;
            // Clone the invoice content
            const clonedContent = invoiceTemplate.cloneNode(true);
            if (clonedContent.style) {
                clonedContent.style.width = `${safePxWidth}px`;
                clonedContent.style.minWidth = `${safePxWidth}px`;
                clonedContent.style.maxWidth = `${safePxWidth}px`;
                clonedContent.style.height = `${safePxHeight}px`;
                clonedContent.style.maxHeight = `${safePxHeight}px`;
                clonedContent.style.overflow = 'hidden';
                clonedContent.style.background = 'white';
                clonedContent.style.transform = 'none';
                clonedContent.style.scale = 'none';
                clonedContent.style.margin = '0 auto';
                clonedContent.style.padding = '0';
                clonedContent.style.boxSizing = 'border-box';
                clonedContent.style.border = 'none';
                clonedContent.style.boxShadow = 'none';
                clonedContent.style.outline = 'none';
            }
            tempContainer.appendChild(clonedContent);
            document.body.appendChild(tempContainer);

            // Wait for fonts and styles to load
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Generate canvas from the temporary container with exact Letter dimensions
            const canvas = await html2canvas(tempContainer, {
                scale: 3, // Even higher scale for sharpness and fit
                useCORS: true,
                logging: false,
                width: safePxWidth,
                height: safePxHeight,
                backgroundColor: '#ffffff',
                allowTaint: true,
                foreignObjectRendering: true,
                removeContainer: false
            });

            // Create PDF with exact Letter size
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'letter');
            const imgData = canvas.toDataURL('image/png', 0.98);
            // Center the image horizontally in the PDF
            const xOffset = (pdfMmWidth - (pdfMmWidth * (safePxWidth / 816))) / 2;
            pdf.addImage(imgData, 'PNG', xOffset, 0, pdfMmWidth - xOffset * 2, pdfMmHeight, undefined, 'FAST');

            // Generate filename
            const fileName = generateFileName(invoiceData, templateNumber);
            pdf.save(fileName);
            document.body.removeChild(tempContainer);
            console.log('PDF generated successfully:', fileName);
            resolve();
        } catch (error) {
            console.error('PDF generation error:', error);
            reject(error);
        }
    });
}

// Generate filename based on template number and invoice data
function generateFileName(invoiceData, templateNumber) {
    const timestamp = new Date().getTime();
    const invoiceNumber = invoiceData?.invoice?.number || invoiceData?.Invoice?.Number || 'INV-001';
    const companyName = invoiceData?.yourCompany?.name || invoiceData?.YourCompany?.Name || 'Company';
    const billToName = invoiceData?.billTo?.name || invoiceData?.BillTo?.Name || 'Client';
    const date = new Date().toISOString().split('T')[0];

    switch (templateNumber) {
        case 1:
            return `${invoiceNumber}.pdf`;
        case 2:
            return `${companyName.replace(/\s+/g, '_')}_${invoiceNumber}.pdf`;
        case 3:
            return `${companyName.replace(/\s+/g, '_')}_Invoice.pdf`;
        case 4:
            return `Invoice_${date}.pdf`;
        case 5:
            return `${invoiceNumber}_${date}.pdf`;
        case 6:
            return `invoice_${timestamp}.pdf`;
        case 7:
            return `Invoice_${invoiceNumber}.pdf`;
        case 8:
            return `Invoice_${billToName.replace(/\s+/g, '_')}.pdf`;
        case 9:
            return `IN_${date}.pdf`;
        case 10:
            return `${invoiceNumber}_Creative.pdf`;
        case 11:
            return `${invoiceNumber}_Bold.pdf`;
        case 12:
            return `${invoiceNumber}_Natural.pdf`;
        default:
            return `invoice_template_${templateNumber}_${timestamp}.pdf`;
    }
}

// Enhanced PDF generation with progress indicator
async function generatePDFWithProgress(contentId, invoiceData, templateNumber, progressCallback) {
    try {
        if (progressCallback) progressCallback(10);
        
        const content = document.getElementById(contentId);
        if (!content) {
            throw new Error('Content element not found');
        }

        if (progressCallback) progressCallback(30);

        const invoiceTemplate = content.querySelector('[class*="bg-white"], .invoice-template, [style*="background: white"]') || content;
        
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        tempContainer.style.width = '794px';
        tempContainer.style.height = 'auto';
        tempContainer.style.background = 'white';
        tempContainer.style.padding = '20px';
        
        tempContainer.innerHTML = invoiceTemplate.outerHTML;
        document.body.appendChild(tempContainer);

        if (progressCallback) progressCallback(50);

        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            width: 794,
            height: 1123,
            backgroundColor: '#ffffff'
        });

        if (progressCallback) progressCallback(80);

        const { jsPDF } = window.jspdf;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        
        const fileName = generateFileName(invoiceData, templateNumber);
        pdf.save(fileName);
        
        document.body.removeChild(tempContainer);
        
        if (progressCallback) progressCallback(100);
        
        return Promise.resolve();
    } catch (error) {
        console.error('PDF generation error:', error);
        return Promise.reject(error);
    }
}

// Fixed PDF generation for templates page
async function generateTemplatePDF(templateNumber, invoiceData) {
    try {
        // Look for the specific template preview
        const templateContainer = document.getElementById(`template-preview-${templateNumber}`) || 
                                document.querySelector(`[id*="template-${templateNumber}"]`) ||
                                document.querySelector('.template-preview-full');
        
        if (!templateContainer) {
            console.error('Template container not found');
            return;
        }

        // Find the actual invoice template inside the preview container
        let invoiceTemplate = templateContainer.querySelector('[style*="width: 816px"], [style*="width:816px"], .invoice-template');
        if (!invoiceTemplate) {
            // fallback: use the first child div
            invoiceTemplate = templateContainer.firstElementChild || templateContainer;
        }

        // Create temporary container with the template
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            top: -9999px;
            width: 816px;
            min-width: 816px;
            max-width: 816px;
            height: 1056px;
            min-height: 1056px;
            max-height: 1056px;
            background: white;
            margin: 0;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            border: none !important;
            box-shadow: none !important;
            outline: none !important;
        `;
        // Clone and scale the template properly
        const clonedTemplate = invoiceTemplate.cloneNode(true);
        if (clonedTemplate.style) {
            clonedTemplate.style.transform = 'none';
            clonedTemplate.style.transformOrigin = 'top left';
            clonedTemplate.style.width = '816px';
            clonedTemplate.style.minWidth = '816px';
            clonedTemplate.style.maxWidth = '816px';
            clonedTemplate.style.height = '1056px';
            clonedTemplate.style.minHeight = '1056px';
            clonedTemplate.style.maxHeight = '1056px';
            clonedTemplate.style.background = 'white';
            clonedTemplate.style.margin = '0';
            clonedTemplate.style.padding = '48px';
            clonedTemplate.style.border = 'none';
            clonedTemplate.style.boxShadow = 'none';
            clonedTemplate.style.outline = 'none';
            clonedTemplate.style.boxSizing = 'border-box';
        }
        // Remove border/box-shadow/outline from all children
        Array.from(clonedTemplate.querySelectorAll('*')).forEach(el => {
            el.style.border = 'none';
            el.style.boxShadow = 'none';
            el.style.outline = 'none';
            el.style.borderLeft = 'none';
        });
        tempContainer.appendChild(clonedTemplate);
        document.body.appendChild(tempContainer);

        await new Promise(resolve => setTimeout(resolve, 800));

        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            width: 816,
            height: 1056,
            backgroundColor: '#ffffff'
        });

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'letter');
        const imgData = canvas.toDataURL('image/png', 0.98);
        pdf.addImage(imgData, 'PNG', 0, 0, 216, 279, undefined, 'FAST');
        
        const fileName = generateFileName(invoiceData, templateNumber);
        pdf.save(fileName);
        
        document.body.removeChild(tempContainer);
    } catch (error) {
        console.error('Template PDF generation error:', error);
    }
}
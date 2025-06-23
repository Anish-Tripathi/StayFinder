import { X, Download } from "lucide-react";
import { Booking } from "../../types/history";
import PrintableReceipt from "./PrintableReceipt";
import { format } from "date-fns";

interface ReceiptModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const ReceiptModal = ({
  booking,
  isOpen,
  onClose,
  onDownload,
}: ReceiptModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Trigger the download functionality
    onDownload();

    const totalGuests = booking.guests
      ? booking.guests.adults + booking.guests.children + booking.guests.infants
      : 1;

    // Create a print-friendly version
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - ${booking.confirmationCode}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              body { 
                font-family: 'Inter', sans-serif; 
                background: #ffffff;
                color: #111827;
                line-height: 1.5;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .page {
                max-width: 800px;
                margin: 0 auto;
                padding: 2.5rem;
                background: white;
              }
              .header { 
                text-align: center; 
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
              }
              .logo { 
                font-size: 1.75rem; 
                font-weight: 700; 
                color: #111827;
                margin-bottom: 0.25rem;
                letter-spacing: -0.5px;
              }
              .logo span {
                background: linear-gradient(90deg, #2563eb, #4f46e5);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
              .tagline { 
                color: #6b7280; 
                font-size: 0.875rem; 
                margin-bottom: 0.5rem;
              }
              .receipt-number {
                font-size: 0.875rem;
                color: #6b7280;
              }
              .divider { 
                height: 1px; 
                background: #e5e7eb; 
                margin: 1.5rem 0; 
                border: none;
              }
              .section-title { 
                font-size: 1.125rem; 
                font-weight: 600; 
                color: #111827; 
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
              }
              .section-title:before {
                content: "";
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #2563eb;
                margin-right: 0.75rem;
              }
              .receipt-details { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 2rem; 
                gap: 2rem;
              }
              .detail-group { 
                flex: 1; 
              }
              .detail-row { 
                display: flex; 
                margin-bottom: 0.75rem; 
                font-size: 0.875rem;
                align-items: flex-start;
              }
              .detail-label { 
                color: #6b7280; 
                min-width: 120px; 
                flex-shrink: 0;
              }
              .detail-value { 
                color: #111827; 
                font-weight: 500;
              }
              .status-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: capitalize;
              }
              .status-confirmed {
                background-color: #dcfce7;
                color: #166534;
              }
              .status-cancelled {
                background-color: #fee2e2;
                color: #991b1b;
              }
              .status-pending {
                background-color: #fef3c7;
                color: #92400e;
              }
              .property-card { 
                background: #f8fafc; 
                border-radius: 0.75rem; 
                padding: 1.25rem; 
                margin-bottom: 2rem;
                border: 1px solid #e2e8f0;
              }
              .property-title { 
                font-weight: 600; 
                margin-bottom: 0.5rem;
                font-size: 1.125rem;
              }
              .property-info { 
                display: flex; 
                align-items: center; 
                color: #64748b; 
                font-size: 0.875rem; 
                margin-bottom: 0.25rem;
              }
              .property-info svg { 
                margin-right: 0.5rem; 
                width: 1rem; 
                height: 1rem;
                flex-shrink: 0;
              }
              .price-breakdown {
                margin-bottom: 2rem;
              }
              .price-item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 0.5rem; 
                font-size: 0.875rem;
                padding: 0.25rem 0;
              }
              .price-label { 
                color: #64748b; 
              }
              .price-value { 
                color: #111827; 
                font-weight: 500;
              }
              .total-row { 
                border-top: 1px solid #e5e7eb; 
                padding-top: 0.75rem; 
                margin-top: 0.75rem; 
                font-size: 1rem;
              }
              .total-label { 
                font-weight: 600; 
              }
              .total-value { 
                font-weight: 700; 
                font-size: 1.25rem;
                color: #2563eb;
              }
              .footer { 
                text-align: center; 
                margin-top: 3rem; 
                color: #64748b; 
                font-size: 0.8125rem;
                padding-top: 1.5rem;
                border-top: 1px solid #e5e7eb;
              }
              .watermark {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                opacity: 0.1;
                font-size: 5rem;
                font-weight: 700;
                color: #2563eb;
                pointer-events: none;
                z-index: -1;
                transform: rotate(-15deg);
              }
              @media print {
                body { 
                  background: white;
                  font-size: 12pt;
                }
                .page { 
                  padding: 1.5cm;
                  box-shadow: none;
                }
                .no-print {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="header">
                <h1 class="logo"><span>StayFinder</span></h1>
                <p class="tagline">Professional Accommodation Services</p>
                <p class="receipt-number">Receipt #${
                  booking.confirmationCode ||
                  booking._id.slice(-8).toUpperCase()
                }</p>
              </div>

              <div class="receipt-details">
                <div class="detail-group">
                  <h3 class="section-title">Receipt Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">Date Issued:</span>
                    <span class="detail-value">
                      ${format(
                        new Date(booking.createdAt || new Date()),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value">
                      <span class="status-badge status-${booking.status}">${
        booking.status
      }</span>
                    </span>
                  </div>
                </div>

                <div class="detail-group">
                  <h3 class="section-title">Booking Information</h3>
                  <div class="detail-row">
                    <span class="detail-label">Dates:</span>
                    <span class="detail-value">
                      ${format(
                        new Date(booking.checkIn),
                        "MMM d, yyyy"
                      )} - ${format(
        new Date(booking.checkOut),
        "MMM d, yyyy"
      )}<br>
                      <small style="color: #9ca3af;">${
                        booking.nightsCount ||
                        booking.pricing.nights ||
                        booking.duration ||
                        1
                      } night(s)</small>
                    </span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Guests:</span>
                    <span class="detail-value">${totalGuests}</span>
                  </div>
                  ${
                    booking.payment
                      ? `
                  <div class="detail-row">
                    <span class="detail-label">Payment:</span>
                    <span class="detail-value">
                      ${booking.payment.method}<br>
                      <small style="color: #9ca3af;">${booking.payment.status}</small>
                    </span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <div class="property-card">
                <h3 class="section-title">Property Details</h3>
                <h4 class="property-title">${booking.listing.title}</h4>
                <div class="property-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${booking.listing.location.city}, ${
        booking.listing.location.country
      }
                </div>
                <div class="property-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Hosted by ${booking.host.firstName} ${booking.host.lastName}
                </div>
              </div>

              <div class="price-breakdown">
                <h3 class="section-title">Pricing Breakdown</h3>
                ${
                  booking.pricing.basePrice && booking.pricing.nights
                    ? `
                  <div class="price-item">
                    <span class="price-label">
                      ₹${booking.pricing.basePrice.toFixed(2)} × ${
                        booking.pricing.nights
                      } night${booking.pricing.nights !== 1 ? "s" : ""}
                    </span>
                    <span class="price-value">
                      ₹${(
                        booking.pricing.basePrice * booking.pricing.nights
                      ).toFixed(2)}
                    </span>
                  </div>
                `
                    : ""
                }
                ${
                  booking.pricing.cleaningFee && booking.pricing.cleaningFee > 0
                    ? `
                  <div class="price-item">
                    <span class="price-label">Cleaning Fee</span>
                    <span class="price-value">₹${booking.pricing.cleaningFee.toFixed(
                      2
                    )}</span>
                  </div>
                `
                    : ""
                }
                ${
                  booking.pricing.serviceFee && booking.pricing.serviceFee > 0
                    ? `
                  <div class="price-item">
                    <span class="price-label">Service Fee</span>
                    <span class="price-value">₹${booking.pricing.serviceFee.toFixed(
                      2
                    )}</span>
                  </div>
                `
                    : ""
                }
                ${
                  booking.pricing.taxes && booking.pricing.taxes > 0
                    ? `
                  <div class="price-item">
                    <span class="price-label">Taxes</span>
                    <span class="price-value">₹${booking.pricing.taxes.toFixed(
                      2
                    )}</span>
                  </div>
                `
                    : ""
                }

                <div class="price-item total-row">
                  <span class="price-label total-label">Total</span>
                  <span class="price-value total-value">₹${booking.pricing.totalPrice.toFixed(
                    2
                  )}</span>
                </div>
              </div>

              <div class="footer">
                <p>Thank you for choosing StayFinder!</p>
                <p>For support, contact us at support@stayFinder.com</p>
                <p style="margin-top: 0.5rem; color: #9ca3af;">This is an automated receipt. No signature required.</p>
              </div>

              <div class="watermark no-print">StayFinder</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      // Wait for fonts to load before printing
      printWindow.document.fonts.ready.then(() => {
        printWindow.print();
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Booking Receipt
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          <PrintableReceipt booking={booking} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;

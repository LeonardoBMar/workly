import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─── CSV Export ───────────────────────────────────────────────
export function exportToCSV(
  data: Record<string, unknown>[],
  columns: { key: string; header: string }[],
  filename: string,
) {
  const headers = columns.map((c) => c.header).join(',');
  const rows = data.map((row) =>
    columns
      .map((c) => {
        const val = row[c.key];
        const str = val !== null && val !== undefined ? String(val) : '';
        // Escape commas and quotes
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(','),
  );

  const csvContent = '\uFEFF' + [headers, ...rows].join('\n'); // BOM for UTF-8
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

// ─── XLSX Export ──────────────────────────────────────────────
export function exportToXLSX(
  data: Record<string, unknown>[],
  columns: { key: string; header: string }[],
  filename: string,
  sheetName = 'Relatório',
) {
  const worksheetData = [
    columns.map((c) => c.header),
    ...data.map((row) =>
      columns.map((c) => {
        const val = row[c.key];
        return val !== null && val !== undefined ? val : '';
      }),
    ),
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // Auto-size columns
  const colWidths = columns.map((c, i) => {
    const headerLen = c.header.length;
    const maxDataLen = Math.max(
      ...data.map((row) => String(row[c.key] ?? '').length),
      0,
    );
    return { wch: Math.min(Math.max(headerLen, maxDataLen) + 2, 40) };
  });
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// ─── PDF Export ──────────────────────────────────────────────
export function exportToPDF(
  data: Record<string, unknown>[],
  columns: { key: string; header: string }[],
  title: string,
  filename: string,
) {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Title
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text(title, 14, 18);

  // Date
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
    14,
    26,
  );

  // Table
  autoTable(doc, {
    startY: 32,
    head: [columns.map((c) => c.header)],
    body: data.map((row) =>
      columns.map((c) => {
        const val = row[c.key];
        return val !== null && val !== undefined ? String(val) : '';
      }),
    ),
    styles: {
      fontSize: 8,
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  doc.save(`${filename}.pdf`);
}

// ─── Helpers ─────────────────────────────────────────────────
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

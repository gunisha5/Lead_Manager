export function exportToCsv<T>(
  data: T[],
  filename: string,
  columns: { header: string; accessor: (item: T) => string | number }[]
) {
  if (!data || !data.length) return;

  const headers = columns.map(col => col.header);
  
  const csvRows = data.map(row => {
    return columns.map(col => {
      let cellValue = col.accessor(row);
      cellValue = cellValue === null || cellValue === undefined ? '' : String(cellValue);
      if (cellValue.search(/("|,|\n)/g) >= 0) {
        return `"${cellValue.replace(/"/g, '""')}"`;
      }
      return cellValue;
    }).join(',');
  });

  const csvString = [headers.join(','), ...csvRows].join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

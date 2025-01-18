import * as XLSX from 'xlsx';

export const parseExcel = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (!e.target?.result) {
            throw new Error('Failed to read file content');
          }
          
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          
          if (!workbook.SheetNames.length) {
            throw new Error('The Excel file appears to be empty');
          }
          
          let fullContent = '';
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { 
              header: 1,
              raw: false,
              defval: ''
            });
            
            // Skip empty sheets
            if (json.length === 0) return;
            
            // Format the data in a more natural language way
            fullContent += `In the sheet "${sheetName}":\n`;
            
            // Get headers
            const headers = json[0] as string[];
            
            // Process data rows
            json.slice(1).forEach((row: any, rowIndex) => {
              fullContent += `Row ${rowIndex + 1}: `;
              headers.forEach((header, colIndex) => {
                if (row[colIndex]) {
                  fullContent += `${header}: ${row[colIndex]}, `;
                }
              });
              fullContent = fullContent.replace(/,\s*$/, '\n');
            });
            
            fullContent += '\n';
          });
          
          if (!fullContent.trim()) {
            throw new Error('No readable data found in the Excel file');
          }
          
          resolve(fullContent);
        } catch (error) {
          reject(new Error(error instanceof Error ? error.message : 'Failed to parse Excel file. Please ensure it is a valid .xlsx file.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file. Please try again.'));
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(new Error('Failed to process file. Please try again.'));
    }
  });
};
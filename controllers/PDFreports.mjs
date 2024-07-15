import PDFDocument from 'pdfkit-table';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function usersPDF(dataCallback, endCallback, users) {
   const doc = new PDFDocument({ layout: 'landscape', margin: 0 });

   doc.on('data', dataCallback);
   doc.on('end', endCallback);

   // Registrar la fuente "Zen Dots"
   const fontPath = path.join(__dirname, '..', 'resources', 'fonts', 'ZenDots-Regular.ttf');
   doc.registerFont('ZenDots', fontPath);

   // Banner
   const pageWidth = doc.page.width;
   doc.rect(0, 0, pageWidth, 60).fill('#000000');
   doc.font('ZenDots')
       .fontSize(30)
       .fillColor('white')
       .text('AllTechno', 0, 15, { width: pageWidth, align: 'center'});

   doc.moveDown(2);

   // Título del documento
   doc.font('Helvetica-Bold')
       .fontSize(20)
       .fillColor('black')
       .text('Lista de usuarios registrados', { align: 'center' });

   doc.moveUp(0.6);

   // Preparar datos de la tabla
   const tableData = {
       headers: ['Identificación', 'Nombre',  'Correo', 'Celular', 'Rol'],
       rows: users.map(user => [
           user.identificacion,
           user.nombres + " " + user.apellidos,
           user.correo,
           user.celular,
           user.rol,
       ]),
   };

   // Estilo de la tabla
   const tableOptions = {
       width: pageWidth - 60,
       x: 30,
       y: doc.y + 50, // Ajusta el valor de y según necesites
       prepareHeader: () => {
           doc.font('Helvetica-Bold')
               .fontSize(12)
               .fillColor('black');
       },
       prepareRow: (row, i) => {
           doc.font('Helvetica')
               .fontSize(10)
               .fillColor('black');
       },
       padding: 5,
       columnSpacing: 10,
   };

   // Crear la tabla
   doc.table(tableData, tableOptions);

   doc.end();
}

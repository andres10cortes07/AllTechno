import PDFDocument from 'pdfkit-table';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function usersPDF(dataCallback, endCallback, users) {
    const doc = new PDFDocument({ layout: 'landscape', margin: 0 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    // register font "Zen Dots"
    const fontPath = path.join(__dirname, '..', 'resources', 'fonts', 'ZenDots-Regular.ttf');
    doc.registerFont('ZenDots', fontPath);

    // Banner
    const pageWidth = doc.page.width;
    doc.rect(0, 0, pageWidth, 60).fill('#000000');
    doc.font('ZenDots')
        .fontSize(30)
        .fillColor('white')
        .text('AllTechno', 0, 15, { width: pageWidth, align: 'center' });

    doc.moveDown(2);

    // title
    doc.font('Helvetica-Bold')
        .fontSize(20)
        .fillColor('black')
        .text('Lista de usuarios registrados', { align: 'center' });

    doc.moveUp(0.6);

    const tableData = {
        headers: ['Identificación', 'Nombre', 'Correo', 'Celular', 'Rol'],
        rows: users.map(user => [
            user.identificacion,
            user.nombres + " " + user.apellidos,
            user.correo,
            user.celular,
            user.rol,
        ]),
    };

    // tale styles
    const tableOptions = {
        width: pageWidth - 60,
        x: 30,
        y: doc.y + 50, 
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

    // Create table
    doc.table(tableData, tableOptions);

    doc.end();
}

export function productsPDF(dataCallback, endCallback, cellphones, desktops, laptops, powerSupplies, processors, ram, screens) {
    const doc = new PDFDocument({ margin: 30 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    // register font "Zen Dots"
    const fontPath = path.join(__dirname, '..', 'resources', 'fonts', 'ZenDots-Regular.ttf');
    doc.registerFont('ZenDots', fontPath);

    // Banner
    const pageWidth = doc.page.width;
    doc.rect(0, 0, pageWidth, 60).fill('#000000');
    doc.font('ZenDots')
        .fontSize(30)
        .fillColor('white')
        .text('AllTechno', 0, 15, { width: pageWidth, align: 'center' });

    doc.moveDown(1);

    // title
    doc.font('Helvetica-Bold')
        .fontSize(20)
        .fillColor('black')
        .text('Lista de productos registrados', { align: 'center' });

    doc.moveDown(1);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Celulares', { indent: 50 });

    doc.moveUp(1.7);

    const tableData = {
        headers: ['Equipo', 'Colores Disponibles', 'Precio'],
        rows: cellphones.map(cellphone => [
            cellphone.marca + " " + cellphone.modelo,
            cellphone.colores,
            `$${cellphone.precio.toLocaleString()}`
        ]),
    };

    // table styles with three columns
    const tableOptionsThreeColumns = {
        width: pageWidth - 100,
        x: 50,
        y: doc.y + 50,
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

    // table styles with only two columns
    const tableOptionsTwoColumns = {
        width: pageWidth - 100,
        x: 50,
        y: doc.y + 50,
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

    // Create first table
    doc.table(tableData, tableOptionsThreeColumns);


    //* desktops computers section
    doc.moveDown(3);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Portátiles');

    doc.moveDown(2);

    const tableDataLaptops = {
        headers: ['Equipo', 'Colores Disponibles', 'Precio'],
        rows: laptops.map(laptop => [
            laptop.marca + " " + laptop.modelo,
            laptop.colores,
            `$${laptop.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataLaptops, { ...tableOptionsThreeColumns, y: 240 });



    //* processors section
    doc.moveDown(3);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Procesadores');

    doc.moveDown(2);

    const tableDataProcessors = {
        headers: ['Producto', 'Precio'],
        rows: processors.map(processor => [
            processor.marca + " " + processor.modelo + " " + processor.numNucleos + " nucleos " +
            processor.numHilos + " hilos " + processor.relojBase,

            `$${processor.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataProcessors, { ...tableOptionsTwoColumns, y: 300 });



    //* ram section
    doc.moveDown(3);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('RAM');

    doc.moveDown(2);

    const tableDataRam = {
        headers: ['Producto', 'Precio'],
        rows: ram.map(ram => [
            ram.marca + " " + ram.modelo + " " + ram.capacidad + " GB " + ram.velocidad + " MHz",
            `$${ram.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataRam, { ...tableOptionsTwoColumns, y: 360 });



    //* screens section
    doc.moveDown(3);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Monitores');

    doc.moveDown(2);

    const tableDataScreens = {
        headers: ['Producto', 'Precio'],
        rows: screens.map(screen => [
            screen.marca + " " + screen.modelo + " " + screen.resolucion + " MHz",
            `$${screen.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataScreens, { ...tableOptionsTwoColumns, y: 430 });



    //* powerSupplies section
    doc.moveDown(3);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Fuentes de poder');

    doc.moveDown(2);

    const tableDataPowerSupplies = {
        headers: ['Producto', 'Certificación', 'Precio'],
        rows: powerSupplies.map(power => [
            power.marca + " " + power.modelo + " " + power.voltaje + " V" + " " + power.potencia + "P",
            power.certificacion,
            `$${power.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataPowerSupplies, { ...tableOptionsThreeColumns, y: 505 });



    //* desktop Computers section
    doc.moveDown(12);

    doc.font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('black')
        .text('Equipos de escritorio');

    doc.moveDown(2);

    const tableDataDesktop = {
        headers: ['Producto', 'Precio'],
        rows: desktops.map(desktop => [
            desktop.procesador + " + " + desktop.grafica + " + " + desktop.ram + " + " + desktop.almacenamiento + " + " +
            desktop.board + " + " + desktop.chasis + " + " + desktop.fuente + " + ",
            `$${desktop.precio.toLocaleString()}`
        ]),
    };

    doc.table(tableDataDesktop, { ...tableOptionsTwoColumns, y: 80 });

    const pageHeight = doc.page.height;
// Dibujar el rectángulo del pie de página
doc.rect(0, pageHeight - 80, pageWidth, 80).fill('#000000'); 

// Añadir el texto en el pie de página
doc.font('Helvetica')
    .fontSize(12)
    .fillColor('white')
    .text('Soporte: alltechnologysoftware@gmail.com', 0, pageHeight - 50, { width: pageWidth, align: 'center' });

    doc.end();
}
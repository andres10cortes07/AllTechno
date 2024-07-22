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

    // Register font "Zen Dots"
    const fontPath = path.join(__dirname, '..', 'resources', 'fonts', 'ZenDots-Regular.ttf');
    doc.registerFont('ZenDots', fontPath);

    // Banner
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    doc.rect(0, 0, pageWidth, 60).fill('#000000');
    doc.font('ZenDots')
        .fontSize(30)
        .fillColor('white')
        .text('AllTechno', 0, 15, { width: pageWidth, align: 'center' });

    doc.moveDown(1);

    // Title
    doc.font('Helvetica-Bold')
        .fontSize(20)
        .fillColor('black')
        .text('Lista de productos registrados', { align: 'center' });

    doc.moveDown(1);

    let currentY = doc.y;

    // Table options
    const tableOptionsThreeColumns = {
        width: pageWidth - 100,
        x: 50,
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

    const tableOptionsTwoColumns = {
        width: pageWidth - 100,
        x: 50,
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

    // Helper function to calculate height of a title
    const getTitleHeight = (title, fontSize) => doc.heightOfString(title, { fontSize });

    // Helper function to calculate height of a table
    const getTableHeight = (rows, rowHeight) => rows.length * rowHeight + 20; // Added padding

    // Helper function to check if a new page is needed
    const checkPageBreak = (contentHeight) => {
        const buffer = 80;
        if (currentY + contentHeight + buffer > pageHeight - 80) {
            doc.addPage();
            currentY = 60; // Reset position on new page
        }
    };

    // Function to render a section
    const renderSection = (title, tableData, options, rowHeight, titleIndent = 0, titleSpacing = 10) => {
        const titleHeight = getTitleHeight(title, 16);
        const tableHeight = getTableHeight(tableData.rows, rowHeight);

        // Check if there's enough space for the title and the table
        checkPageBreak(titleHeight + tableHeight + titleSpacing);

        doc.font('Helvetica-Bold')
            .fontSize(16)
            .fillColor('black')
            .text(title, { indent: titleIndent });

        currentY = doc.y + titleSpacing; // Reduce space before the table
        doc.moveDown();
        doc.table(tableData, { ...options, y: currentY });

        currentY = doc.y + tableHeight + 20; // Adjust space after the table
    };

    // Table Data for Cellphones
    const tableDataCellphones = {
        headers: ['Equipo', 'Colores Disponibles', 'Precio'],
        rows: cellphones.map(cellphone => [
            cellphone.marca + " " + cellphone.modelo,
            cellphone.colores,
            `$${cellphone.precio.toLocaleString()}`
        ]),
    };

    renderSection('Celulares', tableDataCellphones, tableOptionsThreeColumns, 15, 50, 30);

    // Table Data for Laptops
    const tableDataLaptops = {
        headers: ['Equipo', 'Colores Disponibles', 'Precio'],
        rows: laptops.map(laptop => [
            laptop.marca + " " + laptop.modelo,
            laptop.colores,
            `$${laptop.precio.toLocaleString()}`
        ]),
    };

    renderSection('Portátiles', tableDataLaptops, tableOptionsThreeColumns, 15, 20, 30);

    doc.moveDown(2);

    // Table Data for Desktops
    const tableDataDesktops = {
        headers: ['Producto', 'Precio'],
        rows: desktops.map(desktop => [
            `${desktop.procesador} + ${desktop.grafica} + ${desktop.ram} + ${desktop.almacenamiento} + ${desktop.board} + ${desktop.chasis} + ${desktop.fuente}`,
            `$${desktop.precio.toLocaleString()}`
        ]),
    };
    renderSection('Equipos de escritorio', tableDataDesktops, tableOptionsTwoColumns, 15, 20, 30);

    // Table Data for Power Supplies
    const tableDataPowerSupplies = {
        headers: ['Producto', 'Precio'],
        rows: powerSupplies.map(powerSupply => [
            powerSupply.modelo,
            `$${powerSupply.precio.toLocaleString()}`
        ]),
    };

    renderSection('Fuentes de Poder', tableDataPowerSupplies, tableOptionsTwoColumns, 15, 20, 30);

    // Table Data for Processors
    const tableDataProcessors = {
        headers: ['Producto', 'Precio'],
        rows: processors.map(processor => [
            processor.modelo,
            `$${processor.precio.toLocaleString()}`
        ]),
    };

    renderSection('Procesadores', tableDataProcessors, tableOptionsTwoColumns, 15, 20, 30);

    // Table Data for RAM
    const tableDataRam = {
        headers: ['Producto', 'Precio'],
        rows: ram.map(ramItem => [
            ramItem.modelo,
            `$${ramItem.precio.toLocaleString()}`
        ]),
    };

    renderSection('Memorias RAM', tableDataRam, tableOptionsTwoColumns, 15, 20, 30);

    // Table Data for Screens
    const tableDataScreens = {
        headers: ['Producto', 'Precio'],
        rows: screens.map(screen => [
            screen.modelo,
            `$${screen.precio.toLocaleString()}`
        ]),
    };

    renderSection('Pantallas', tableDataScreens, tableOptionsTwoColumns, 15, 20, 30);

    doc.end();
}
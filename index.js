const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = async (pages, size, options = {}) => {
    const {
        margins,
        margin = 50, // default margin
        scale = 'fit', // 'fit', 'fill', 'none'
        align = 'center', // 'left', 'center', 'right'
        valign = 'center', // 'top', 'center', 'bottom'
        output = 'output.pdf',
        borderMargin = 20, // margin for the border
        borderWidth = 1, // width of the border
        pageNumbering = false, // default to no page numbering
        pageNumberFormat = '1', // '1', 'a', 'A', 'i', etc.
        pageNumberPositionVertical = 'bottom', // 'top' or 'bottom'
        pageNumberPositionHorizontal = 'center', // 'left', 'center', 'right'
        backgroundColor = null, // default to no background color
        filter = null // default to no filter
    } = options;

    // Normalize margins to an object if a single value is provided
    const normalizedMargins = margins || { top: margin, bottom: margin, left: margin, right: margin };

    const doc = new PDFDocument({ size, margins: normalizedMargins });

    // Function to get all image files from a folder
    function getImagesFromFolder(folderPath) {
        const files = fs.readdirSync(folderPath);
        return files.filter(file => /\.(jpg|jpeg|png)$/i.test(file)).map(file => path.join(folderPath, file));
    }

    // If the input is a folder, get all images from the folder
    if (typeof pages === 'string' && fs.lstatSync(pages).isDirectory()) {
        pages = getImagesFromFolder(pages);
    }

    for (let index = 0; index < pages.length; index++) {
        if (backgroundColor) {
            addBackgroundColor(doc, size, backgroundColor);
        }

        let image = pages[index];
        if (typeof image === 'string' && image.startsWith('data:image')) {
            const base64Data = image.split(';base64,').pop();
            image = Buffer.from(base64Data, 'base64');
        } else if (Buffer.isBuffer(image) || typeof image === 'string') {
            image = await applyFilter(image, filter);
        }

        addImage(doc, image, size, normalizedMargins, scale, align, valign);

        if (borderWidth > 0) {
            addBorder(doc, size, normalizedMargins, borderMargin, borderWidth);
        }

        if (pageNumbering) {
            addPageNumber(doc, index + 1, size, normalizedMargins, pageNumberFormat, pageNumberPositionVertical, pageNumberPositionHorizontal);
        }

        if (pages.length !== index + 1) {
            doc.addPage();
        }
    }

    doc.pipe(fs.createWriteStream(output));
    doc.end();

    return doc;
};

async function applyFilter(image, filter) {
    let sharpImage = sharp(image);

    switch (filter) {
        case 'greyscale':
            sharpImage = sharpImage.greyscale();
            break;
        case 'sepia':
            sharpImage = sharpImage.tint({ r: 112, g: 66, b: 20 });
            break;
        case 'negative':
            sharpImage = sharpImage.negate();
            break;
        default:
            break;
    }

    return sharpImage.toBuffer();
}

function addImage(doc, image, size, margins, scale, align, valign) {
    const pageWidth = size[0] - margins.left - margins.right;
    const pageHeight = size[1] - margins.top - margins.bottom;
    
    let x = margins.left;
    let y = margins.top;

    const options = { fit: [pageWidth, pageHeight], align, valign };

    switch (align) {
        case 'center':
            options.align = 'center';
            break;
        case 'right':
            options.align = 'right';
            break;
        case 'left':
        default:
            options.align = 'left';
            break;
    }

    switch (valign) {
        case 'center':
            options.valign = 'center';
            break;
        case 'bottom':
            options.valign = 'bottom';
            break;
        case 'top':
        default:
            options.valign = 'top';
            break;
    }

    switch (scale) {
        case 'fill':
            doc.image(image, x, y, { width: pageWidth, height: pageHeight, align: options.align, valign: options.valign });
            break;
        case 'none':
            doc.image(image, x, y);
            break;
        case 'fit':
        default:
            doc.image(image, x, y, options);
            break;
    }
}

function addBackgroundColor(doc, size, color) {
    const pageWidth = size[0];
    const pageHeight = size[1];

    doc.rect(0, 0, pageWidth, pageHeight).fill(color).fillColor('black');
}

function addBorder(doc, size, margins, borderMargin, borderWidth) {
    const pageWidth = size[0];
    const pageHeight = size[1];
    
    const borderX = margins.left - borderMargin;
    const borderY = margins.top - borderMargin;
    const borderBoxWidth = pageWidth - margins.left - margins.right + 2 * borderMargin;
    const borderBoxHeight = pageHeight - margins.top - margins.bottom + 2 * borderMargin;

    doc.rect(borderX, borderY, borderBoxWidth, borderBoxHeight).lineWidth(borderWidth).stroke();
}

function addPageNumber(doc, pageNumber, size, margins, format, vertical, horizontal) {
    const pageWidth = size[0];
    const pageHeight = size[1];
    const text = formatPageNumber(pageNumber, format);
    
    let x;
    let y;

    switch (horizontal) {
        case 'center':
            x = pageWidth / 2;
            break;
        case 'right':
            x = pageWidth - margins.right;
            break;
        case 'left':
        default:
            x = margins.left;
            break;
    }

    switch (vertical) {
        case 'top':
            y = margins.top / 2;
            break;
        case 'bottom':
        default:
            y = pageHeight - margins.bottom / 2;
            break;
    }

    doc.fontSize(12).text(text, x, y, {
        align: horizontal,
        baseline: vertical === 'top' ? 'bottom' : 'top'
    });
}

function formatPageNumber(number, format) {
    switch (format) {
        case 'a':
            return number.toString(36).toLowerCase();
        case 'A':
            return number.toString(36).toUpperCase();
        case 'i':
            return toRoman(number).toLowerCase();
        case 'I':
            return toRoman(number).toUpperCase();
        case '1':
        default:
            return number.toString();
    }
}

function toRoman(num) {
    if (typeof num !== 'number') return false;

    const digits = String(num).split('');
    const key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
                 '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
                 '','I','II','III','IV','V','VI','VII','VIII','IX'];
    let roman = '';
    let i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
}

module.exports.sizes = require('./sizes.json');

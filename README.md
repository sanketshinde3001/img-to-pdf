<div align="center">

### Welcome to photo-to-pdf 👋

> A easy to use image to PDF converter with multiple features.

<br>

</div>

---

## Instalation
```sh
npm install photo-to-pdf
# OR
yarn add photo-to-pdf
```

## Example
```js
const imgToPDF = require('photo-to-pdf')
const fs = require('fs')

const pages = [
    "./pages/image1.jpeg", // path to the image
    //OR
    "data:image/png;base64,iVBORw...", // base64
    //OR
    fs.readFileSync('./pages/image3.png') // Buffer
]

const size = imgToPDF.sizes.A4;

imgToPDF(pages, size, {
    margin: 30, // Single value applied to all sides
    scale: 'fit', // Scale option set to 'fit'
    align: 'center', // Center align horizontally
    valign: 'center', // Center align vertically
    output: 'output.pdf',
    borderMargin: 10, // Margin for the border
    borderWidth: 2, // Width of the border
    pageNumbering: true, // Enable page numbering
    pageNumberFormat: '1', // Standard numerals for page numbers
    pageNumberPositionVertical: 'bottom', // Position at the bottom
    pageNumberPositionHorizontal: 'right', // Position on the right
    backgroundColor: '#f0f0f0', // Light gray background color
    filter: 'greyscale' // Apply sepia filter
});

```

## Documentation


<div align="center">

# 📸 **Photo-to-PDF** 📄

**Welcome!** 👋

Transform your images into stunning PDFs effortlessly with our feature-rich converter.

---

</div>


## Installation
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
    filter: 'greyscale' // Apply greyscale filter
});

```

## Documentation
## Input Methods

You can provide images to the `photo-to-pdf` package in various formats:
(You can mix up format types in one array also.)

1. **File Path**: Specify the path to the image file.

    ```javascript
    const pages = [
        "./pages/image1.jpeg",
        "./pages/image2.jpeg",
        ......
    ];
    ```

2. **Base64 String**: Provide the image as a Base64 encoded string.

    ```javascript
    const pages = [
        "data:image/png;base64,iVBORw..."
    ];
    ```

3. **Buffer**: Use a Buffer containing the image data.

    ```javascript
    const fs = require('fs');

    const pages = [
        fs.readFileSync('./pages/image3.png')
    ];
    ```
4. **Folder Path**: Specify the path to a folder containing images. It will only select PNG and JPG images present in the folder.

    ```javascript
    const pages = imgToPDF.getImagesFromFolder('./pages/');
    ```
---

## Options

When using `photo-to-pdf`, you can customize the PDF generation with various options:

- **`margin or margins`**: Sets the margin around the images. Accepts a single value that applies to all sides, or an object to specify custom margins for each side.

    ```javascript
    // Single value for all sides
    margin: 30

    // Custom margins for each side
    margins: {
        top: 20,   
        right: 30,  
        bottom: 40, 
        left: 50    
    }
    ```

- **`scale`**: Defines how the image should be scaled. Options include 'fit' (to fit within the page), 'fill' (to fill the page), 'none' (original size of photo) etc.

    ```javascript
    scale: 'fit' 
    ```

- **`align`**: Horizontal alignment of the image. Options include 'left', 'center', and 'right'.

    ```javascript
    align: 'center' 
    ```

- **`valign`**: Vertical alignment of the image. Options include 'top', 'center', and 'bottom'.

    ```javascript
    valign: 'center' 
    ```

- **`output`**: The filename for the output PDF.

    ```javascript
    output: 'output.pdf' 
    ```

- **`borderMargin`**: The margin around the border of the image.

    ```javascript
    borderMargin: 10 
    ```

- **`borderWidth`**: The width of the border.

    ```javascript
    borderWidth: 2 
    ```

- **`pageNumbering`**: Boolean value to enable or disable page numbering.

    ```javascript
    pageNumbering: true 
    ```

- **`pageNumberFormat`**: Format for page numbers (e.g., '1', 'i', 'I', 'a', 'A').

    ```javascript
    pageNumberFormat: '1' 
    ```

- **`pageNumberPositionVertical`**: Vertical position of the page number ('top' or 'bottom').

    ```javascript
    pageNumberPositionVertical: 'bottom' 
    ```

- **`pageNumberPositionHorizontal`**: Horizontal position of the page number ('left', 'center', 'right').

    ```javascript
    pageNumberPositionHorizontal: 'right'  
    ```

- **`backgroundColor`**: Background color of the PDF pages.

    ```javascript
    backgroundColor: '#f0f0f0' 
    ```

- **`filter`**: Filter to apply to the images (e.g., 'greyscale', 'sepia' , 'negative').

    ```javascript
    filter: 'greyscale' 
    ```

### Contributing

Contributions are welcome! If you'd like to contribute to `photo-to-pdf`, please fork the repository and submit a pull request. You can also open an issue if you have any suggestions or find any bugs.

### Contact

If you have any questions or need support, feel free to [contact us](mailto:sanketshinde3123@gmail.com) or [open an issue](https://github.com/sanketshinde3001/img-to-pdf/issues) on GitHub.



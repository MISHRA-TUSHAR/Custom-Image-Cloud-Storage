# Custom-Image-Cloud-Storage

This project consists of two servers that handle image upload and storage. The main server allows users to upload an image, which is then sent to an asset server that stores the image and provides a URL for access.

## Main Server

The main server is responsible for receiving image uploads from clients and forwarding them to the asset server.

### Base URL

```
http://localhost:3000
```


### Endpoints

#### `POST /api/storeImage`

Uploads an image file to the asset server and returns the URL of the stored image.

- **URL:** `/api/storeImage`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Parameters:**
  - `imageData` (form-data): The image file to be uploaded.
- **Response:**
  - `200 OK`: Returns the URL of the uploaded image.
    ```json
    {
      "success": true,
      "url": "http://localhost:4000/uploads/{filename}"
    }
    ```
  - `400 Bad Request`: If no file is uploaded or there is an error in the upload process.
    ```json
    {
      "error": "No file uploaded"
    }
    ```
  - `500 Internal Server Error`: If there is a server error while processing the request.
    ```json
    {
      "success": false,
      "error": "Internal server error"
    }
    ```

#### Example Request

```
curl -X POST http://localhost:3000/api/storeImage -F "imageData=@/path/to/image.jpg"
```

# Asset Server

The asset server handles the actual storage of image files and provides URLs for accessing these images.

### Base URL

```
http://localhost:4000
```

# Endpoints

`POST /api/uploadImage`

Stores an image file received from the main server and returns the URL where the image can be accessed.

URL: `/api/uploadImage`
Method: `POST`
Content-Type: `application/json`

Request Body:


`imageData` (string): The image file data encoded in Base64.


`fileName` (string): The name of the image file.


# Response:

`200 OK`: Returns the URL of the uploaded image.

`
{
  "success": true,
  "url": "http://localhost:4000/uploads/{filename}"
}
`

`400 Bad Request`: If no image data or file name is provided.

`
{
  "success": false,
  "error": "No image data or file name provided"
}
`

`GET /api/check` Checks if the asset server is running.


URL: `/api/check`

Method: `GET`

Response:
`200 OK`: Server is running

#### Static Files

Serves the uploaded image files.

- **URL:** `/uploads/{filename}`

- **Method:** `GET`
  
- **Response:**
  
  - The image file.

#### Example Request

```
curl -X POST http://localhost:4000/api/uploadImage -H "Content-Type: application/json" -d {
  "imageData": "base64_encoded_image_data",
  "fileName": "image.jpg"
}
```

# Example Usage

```
const uploadToServer = require('./utils/uploadImage');

const imageData = await uploadToServer('uploads/image.jpg', 'image.jpg');
console.log(imageData);
```

### Day-2 at Vervali

#### Task-1 : Explore about the redux toolkit and react redux , difference between them 
Ref : https://github.com/ZaidVervali/Redux


#### Task-2 : create reusable authentication using MYSQL as database and Sequelize as ORM
##### Topics in which i worked on
1. Different types of Architecture
     - MVC
       simple model , view and controller we used for smaller project
       
     - Clean architecture
       along with MVC the standardised code is maintained 
       
     - Microservices
       used for larger and complex project

  2. ORM - Sequelize
  3. MySQL DB

--

### Day-3 at Vervali

#### Task-1 : Write a code using Nodejs to upload file from user store in a local folder and store the file path inside database

- task is done with 3 different routes : uploadFile(to upload single file) , uploadMulFile(to upload multiple files) , getAllFiles(to get the stored file details) , delFiel(to delete file on the basis of id)

##### Multer 
In the above code, multer is used as middleware to handle file uploads in your Express.js application. Here are the key roles multer plays:

1. Handling Multipart Form Data
HTTP requests that upload files use the multipart/form-data encoding. multer parses these incoming form data requests and makes the file data available through req.file or req.files in your request handlers.

2. Managing File Storage
In conjunction with multer-s3, multer allows you to specify how and where the uploaded files should be stored. The configuration specifies:
- Destination (Bucket): The S3 bucket where files will be uploaded.
- Filename (Key): How the uploaded files should be named.
- Metadata: Any additional information you want to store alongside the file in S3.

3. File Validation and Configuration
multer can be configured to:
- Limit the size of the files being uploaded.
- Restrict the type of files being uploaded (e.g., only images).
- Specify the number of files that can be uploaded in a single request

##### how to implement same functionality with AWS S3 becket refer below code

1. Set up AWS SDK in your Node.js project.
2. Configure AWS credentials.
3. Modify the file controller to handle uploads and deletions with S3.
4. Update the routes.

- Install the necessary packages:
   npm install aws-sdk multer multer-s3

- Ref : https://chatgpt.com/share/7fe19830-8883-40cd-8372-92187bbff348

- Major changes inside the code 

  // Configure AWS S3
  const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
  });

  // Set up multer to use S3 for storage
  const storage = multerS3({
      s3: s3,
      bucket: 'your-bucket-name',
      acl: 'public-read',
      metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
  });


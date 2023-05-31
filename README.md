# Hospital API

This is a Node.js and MongoDB-based API for managing doctors and patients in a hospital, specifically for COVID-19 testing and quarantine purposes.

## Tools and Libraries Used
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express.js**: A web application framework for building APIs with Node.js.
- **MongoDB**: A NoSQL database for storing data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Bcrypt**: A library for hashing passwords.
- **JWT (JSON Web Tokens)**: A method for securely transmitting information as a JSON object.
- Postman: A collaboration platform for testing and documenting APIs.


## Setup

1. Clone the repository:

   `git clone <repository_url>`

2. Install dependencies:

  `cd hospital-api`
  `npm install`

3. Set up environment variables:

   Create a .env file in the root directory and provide the following environment variables:

   `PORT=<port_number>`
   `db=<mongodb_uri>`
   `JWT_SECRET=<jwt_secret>`

4. Start the server:

   `npm start`

## Testing with Postman

To test the API endpoints, you can use Postman. Here are the steps to test the endpoints:

### Register a Doctor

- Endpoint: POST /doctors/register
- Request Body:
  - username (string): Doctor's username
  - password (string): Doctor's password
  **Body:** `{ "username": "doctor_username", "password": "doctor_password" }`

### Login a Doctor

- Endpoint: POST /doctors/login
- Request Body:
  - username (string): Doctor's username
  - password (string): Doctor's password
  **Body:** `{ "username": "doctor_username", "password": "doctor_password" }`
- Response: The response will include a JWT token that needs to be included in the headers for protected routes.

### Register a Patient

- Endpoint: POST /patients/register
- Request Body:
  - phoneNumber (string): Patient's phone number
**Body:** `{ "phoneNumber": "patient_phoneNumber" }`

### Create a Report for a Patient

- Endpoint: POST /patients/:id/create_report
- Request Parameters:
  - id (string): Patient ID
- Request Body:
  - doctorId (string): Doctor ID
  - status (string): Report status (Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit)
  **Body:** `{ "doctorId": "doctor_d","status": "Positive-Admit" }`

### Get All Reports of a Patient

- Endpoint: GET /patients/:id/all_reports
- Request Parameters:
  - id (string): Patient ID

### Get All Reports by Status

- Endpoint: GET /reports/:status
- Request Parameters:
  - status (string): Report status
 Report status (Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit)

Note: For protected routes (create_report, all_reports, and reports), include the JWT token in the headers:
- Key: Authorization
- Value: Bearer <jwt_token>

Please ensure that you have MongoDB running and have set up the environment variables correctly before testing the endpoints.

## Folder Structure
hospital-api/</br>
├── config/</br>
│   └── mongoose.js</br>
├── controllers/</br>
│   ├── authController.js</br>
│   ├── doctorsController.js</br>
│   ├── patientsController.js</br>
│   └── reportsController.js</br>
├── models/</br>
│   ├── Doctor.js</br>
│   ├── Patient.js</br>
│   └── Report.js</br>
├── routes/</br>
│   ├── doctors.js</br>
│   ├── patients.js</br>
│   └── reports.js</br>
├── index.js</br>
├── auth.js</br>
└── .env</br>


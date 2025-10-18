# G4-Clinic-Appointment-System


**Base URL:** `https://g4-clinic-appointment-system.onrender.com`

## API Endpoints

### Patients

| Method | Endpoint | Description | Sample Request |
|--------|----------|-------------|----------------|
| **POST** | `/api/patients` | Create new patient | **URL:** `POST {{base_url}}/api/patients`<br>**Body (raw JSON):**<br>{<br>```"name": "Maria Garcia",```<br>  ```"birthDate": "1988-12-15",```<br>  ```"email": "maria.garcia@example.com",```<br>  ```"phone": "09172345678"```<br>} |
| **GET** | `/api/patients` | Get all patients | **URL:** `GET {{base_url}}/api/patients` |
| **GET** | `/api/patients/:id` | Get patient by ID | **URL:** `GET {{base_url}}/api/patients/{{patient_id}}` |
| **PUT** | `/api/patients/:id` | Update patient | **URL:** `PUT {{base_url}}/api/patients/{{patient_id}}`<br>**Body (raw JSON):**<br>{<br>  ```"phone": "09179998877",```<br>  ```"email": "updated.email@example.com"```<br>}<br> |
| **DELETE** | `/api/patients/:id` | Delete patient | **URL:** `DELETE {{base_url}}/api/patients/{{patient_id}}` |

### Doctors

| Method | Endpoint | Description | Sample Request |
|--------|----------|-------------|----------------|
| **POST** | `/api/doctors` | Create new doctor | **URL:** `POST {{base_url}}/api/doctors`<br>**Body (raw JSON):**<br>{<br>  ```"name": "Dr. Carlos Reyes",```<br>  ```"specialty": "Pediatrics"```<br>}<br> |
| **GET** | `/api/doctors` | Get all doctors | **URL:** `GET {{base_url}}/api/doctors` |
| **GET** | `/api/doctors/:id` | Get doctor by ID | **URL:** `GET {{base_url}}/api/doctors/{{doctor_id}}` |
| **PUT** | `/api/doctors/:id` | Update doctor | **URL:** `PUT {{base_url}}/api/doctors/{{doctor_id}}`<br>**Body (raw JSON):**<br>{<br>  ```"specialty": "General Medicine"```<br>}<br> |
| **DELETE** | `/api/doctors/:id` | Delete doctor | **URL:** `DELETE {{base_url}}/api/doctors/{{doctor_id}}` |

### Appointments

| Method | Endpoint | Description | Sample Request |
|--------|----------|-------------|----------------|
| **POST** | `/api/appointments` | Create appointment | **URL:** `POST {{base_url}}/api/appointments`<br>**Body (raw JSON):**<br>{<br>  ```"patientId": "{{patient_id}}",```<br>  ```"doctorId": "{{doctor_id}}",```<br>  ```"startAt": "2024-10-26T14:00:00.000Z",```<br>  ```"endAt": "2024-10-26T15:00:00.000Z",```<br>  ```"notes": "Regular checkup"```<br>}<br>|
| **GET** | `/api/appointments` | Get all appointments | **URL:** `GET {{base_url}}/api/appointments` |
| **GET** | `/api/appointments/:id` | Get appointment by ID | **URL:** `GET {{base_url}}/api/appointments/{{appointment_id}}` |
| **PUT** | `/api/appointments/:id` | Update appointment | **URL:** `PUT {{base_url}}/api/appointments/{{appointment_id}}`<br>**Body (raw JSON):**<br>{<br> "startAt": ```"2024-10-27T10:00:00.000Z",```<br> ```"endAt": "2024-10-27T11:00:00.000Z",```<br> ```"notes": "Rescheduled appointment",```<br>}<br> |
| **DELETE** | `/api/appointments/:id` | Delete appointment | **URL:** `DELETE {{base_url}}/api/appointments/{{appointment_id}}` |

### Test Data
**Pre-loaded with sample patients, doctors, and appointments.**

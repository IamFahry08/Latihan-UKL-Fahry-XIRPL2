# 📘 UKL XI RPL Backend – Sistem Autentikasi & Presensi

### 🔗 **Link Repository GitHub**
[👉 Klik di sini untuk membuka repository](https://github.com/Nabilkencana22/UKL-XI-RPL-Backend-)

> 💡 **Catatan:** Pastikan setiap update fitur baru (Auth, Users, Attendance) juga menambahkan screenshot output di bawah bagian “📸 Screenshot Output”.

---

## 🧩 Deskripsi Proyek
Proyek ini adalah **RESTful API** berbasis **NestJS** yang digunakan untuk:
- 🔐 Autentikasi dan otorisasi pengguna  
- 👤 Manajemen data pengguna (CRUD)  
- 🕒 Pencatatan dan analisis presensi  

Didesain untuk kebutuhan sistem kehadiran sederhana di lingkungan sekolah atau perusahaan.

---

## ⚙️ Teknologi yang Digunakan
- **NestJS (Node.js Framework)**
- **TypeScript**
- **JWT (JSON Web Token)**
- **Bcrypt (Hashing Password)**
- **DayJS (Date Handling)**
- **Express.js**
- **In-memory data (bisa dikembangkan ke PostgreSQL/MySQL)**

---

## 🚀 Langkah Instalasi

1️⃣ **Clone Repository**
```bash
git clone https://github.com/Nabilkencana22/UKL-XI-RPL-Backend-.git
cd UKL-XI-RPL-Backend-
```

2️⃣ **Install Dependencies**
```bash
npm install
```

3️⃣ **Jalankan Server**
```bash
npm run start:dev
```

4️⃣ **Server Berjalan di:**
```
http://localhost:3000/api
```

---

## 🔑 Autentikasi (Auth)

### Endpoint: `/api/auth/login`
**Method:** `POST`  
**Deskripsi:** Login pengguna dan mendapatkan token autentikasi.

#### Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

#### Response:
```json
{
  "status": "success",
  "message": "Login berhasil",
  "token": "jwt_token_here"
}
```

📸 **Screenshot Output Login:**
<img width="1920" height="1080" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/f2b7dbf8-7ae3-4573-97aa-44d577d34d6f" />

---

## 👥 Manajemen Pengguna (Users)

### Tambah Pengguna  
**POST** `/api/users`

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "123456",
  "role": "siswa"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "role": "siswa"
  }
}
```

📸 **Screenshot Output Tambah Pengguna:**
![Users Create Screenshot](.Sreenshoot/Screenshot(84).png)

---

### Ubah Data Pengguna  
**PUT** `/api/users/{id}`

```json
{
  "name": "John Updated",
  "username": "johnupdate",
  "password": "654321",
  "role": "karyawan"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Pengguna berhasil diubah",
  "data": {
    "id": 1,
    "name": "John Updated",
    "username": "johnupdate",
    "role": "karyawan"
  }
}
```

📸 **Screenshot Output Update Pengguna:**
![Users Update Screenshot](./screenshots/users-update.png)

---

### Ambil Data Pengguna  
**GET** `/api/users/{id}`

**Response**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Updated",
    "username": "johnupdate",
    "role": "karyawan"
  }
}
```

📸 **Screenshot Output Get Pengguna:**
![Users Get Screenshot](./screenshots/users-get.png)

---

## 🕒 Presensi (Attendance)

### Mencatat Presensi  
**POST** `/api/attendance`

```json
{
  "user_id": 1,
  "date": "2025-11-03",
  "time": "07:45:00"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Presensi berhasil dicatat",
  "data": {
    "attendance_id": 1,
    "user_id": 1,
    "date": "2025-11-03",
    "time": "07:45:00",
    "status": "hadir"
  }
}
```

📸 **Screenshot Output Presensi:**
![Attendance Create Screenshot](./screenshots/attendance-create.png)

---

### Riwayat Presensi  
**GET** `/api/attendance/history/{user_id}`

**Response**
```json
{
  "status": "success",
  "data": [
    {
      "attendance_id": 1,
      "user_id": 1,
      "date": "2025-11-03",
      "time": "07:45:00",
      "status": "hadir"
    }
  ]
}
```

📸 **Screenshot Output History Presensi:**
![Attendance History Screenshot](./screenshots/attendance-history.png)

---

### Rekap Kehadiran Bulanan  
**GET** `/api/attendance/summary/{user_id}`

**Response**
```json
{
  "status": "success",
  "data": {
    "user_id": 1,
    "month": "11-2025",
    "attendance_summary": {
      "hadir": 20,
      "izin": 2,
      "sakit": 1,
      "alpa": 1
    }
  }
}
```

📸 **Screenshot Output Rekap Bulanan:**
![Attendance Summary Screenshot](./screenshots/attendance-summary.png)

---

## 📊 Analisis Kehadiran

### Endpoint: `/api/attendance/analysis`
**Method:** `POST`

**Request Body:**
```json
{
  "start_date": "2025-11-01",
  "end_date": "2025-11-30",
  "group_by": "kelas"
}
```

**Response**
```json
{
  "status": "success",
  "data": {
    "analysis_period": {
      "start_date": "2025-11-01",
      "end_date": "2025-11-30"
    },
    "grouped_analysis": [
      {
        "group": "kelas 11",
        "total_users": 30,
        "attendance_rate": {
          "hadir_percentage": 90.0,
          "izin_percentage": 5.0,
          "sakit_percentage": 3.0,
          "alpa_percentage": 2.0
        }
      }
    ]
  }
}
```

📸 **Screenshot Output Analisis Kehadiran:**
![Attendance Analysis Screenshot](./screenshots/attendance-analysis.png)

---

## 👨‍💻 Dikembangkan Oleh
**Mohammad Nabil Anwar Kencana**  
SMK Telkom Malang  
Kelas XI RPL  


# 📘 UKL XI RPL Backend – Sistem Autentikasi & Presensi

### 🔗 **Link Repository GitHub**
[👉 Klik di sini untuk membuka repository](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2.git)

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
  "name": "Fahry Irvan",
  "email": "fahryirvayudiansyah@gmail.com",
  "phone": "085872993245",
  "role": "student"
}
```

**Response**
```json
{
    "id": 4,
    "name": "Fahry Irvan",
    "email": "fahryirvayudiansyah@gmail.com",
    "phone": "085872993245",
    "role": "student",
    "createdAt": "2025-11-04 18:24:56"
}
```

📸 **Screenshot Output Tambah Pengguna:**
<img width="1920" height="1080" alt="Screenshot (92)" src="https://github.com/user-attachments/assets/df00702a-1ad3-4231-a9a5-da110b78c257" />


---

### Ubah Data Pengguna  
**PUT** `/api/users/{id}`

```json
{
  "email": "fahryirvanyudiansyah@gmail.com",
  "role": "admin"
}

```

**Response**
```json
{
    "id": 1,
    "name": "Fahry Irvan Yudiansyah",
    "email": "fahryirvanyudiansyah@gmail.com",
    "phone": "085872993245",
    "role": "admin",
    "createdAt": "2025-11-04 17:54:02",
    "updatedAt": "2025-11-04 17:54:19"
}
```

📸 **Screenshot Output Update Pengguna:**
![Users Update Screenshot](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2/blob/main/Sreenshoot/Screenshot%20(86).png)

---

### Ambil Data Pengguna  
**GET** `/api/users/{id}`

**Response**
```json
{
    "id": 1,
    "name": "Fahry Irvan Yudiansyah",
    "email": "fahryirvanyudiansyah@gmail.com",
    "phone": "085872993245",
    "role": "admin",
    "createdAt": "2025-11-04 17:54:02",
    "updatedAt": "2025-11-04 17:54:19"
}
```

📸 **Screenshot Output Get Pengguna:**
<img width="1920" height="1080" alt="Screenshot (93)" src="https://github.com/user-attachments/assets/14219e49-5d81-4c6e-81fd-f960508578bd" />


---

## 🕒 Presensi (Attendance)

### Mencatat Presensi  
**POST** `/api/attendance`

```json
{
  "userId": 1,
  "status": "alpa"
}

```

**Response**
```json
{
    "status": "Berhasil",
    "massage": "Presensi berhasil dicatat",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "status": "alpa",
            "date": "2025-11-04 17:54:58"
        }
    ]
}
```

📸 **Screenshot Output Presensi:**
![Attendance Create Screenshot](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2/blob/main/Sreenshoot/Screenshot%20(88).png)

---

### Riwayat Presensi  
**GET** `/api/attendance/history/{user_id}`

**Response**
```json
{
    "status": "success",
    "message": "Data presensi untuk userId 1 ditemukan",
    "data": [
        {
            "id": 1,
            "userId": 1,
            "status": "alpa",
            "date": "2025-11-04 17:54:58"
        }
    ]
}
```

📸 **Screenshot Output History Presensi:**
![Attendance History Screenshot](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2/blob/main/Sreenshoot/Screenshot%20(89).png)

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
            "hadir": 0,
            "izin": 0,
            "sakit": 0,
            "alpa": 1
        }
    }
}
```

📸 **Screenshot Output Rekap Bulanan:**
![Attendance Summary Screenshot](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2/blob/main/Sreenshoot/Screenshot%20(90).png)

---

## 📊 Analisis Kehadiran

### Endpoint: `/api/attendance/analysis`
**Method:** `POST`

**Request Body:**
```json
{
  "start_date": "2024-11-01",
  "end_date": "2024-11-30"
}
```

**Response**
```json
{
    "status": "error",
    "message": "Tidak ada data di periode ini"
}
```

📸 **Screenshot Output Analisis Kehadiran:**
![Attendance Analysis Screenshot](https://github.com/IamFahry08/Latihan-UKL-Fahry-XIRPL2/blob/main/Sreenshoot/Screenshot%20(91).png)

---

## 👨‍💻 Dikembangkan Oleh
**FAHRY IRVAN YUDIANSYAH**  
SMK Telkom Malang  
Kelas XI RPL 2  



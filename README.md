# 🏢 HR Portal

A web-based **HR Management System** that allows HR personnel to manage employees, track attendance, process payroll, and handle leave requests. Employees can log in to view their details, apply for leave, mark attendance, and check their payroll.

## 📌 Features

### **HR Dashboard**
- ✅ View employee details and total employee count  
- ✅ Add, update, and delete employees  
- ✅ Track attendance and manage leave requests (approve/reject)  
- ✅ Process payroll  

### **Employee Dashboard**
- ✅ View personal details  
- ✅ Apply for leave and check leave status  
- ✅ Mark attendance  
- ✅ View payroll  

## 🚀 Tech Stack

**Frontend (Client):**  
⚡ React.js | 🎨 Bootstrap | 🔀 React Router | 🔗 Fetch API  

**Backend (Server):**  
🖥 Spring Boot | 🔒 Spring Security (JWT) | 🗄 MySQL | 📦 Spring Data JPA | ✍ Lombok | 🛠 Postman  

---

## ⚙️ Installation Guide

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/malviyakunal/HR-Portal.git
cd HR-Portal

2️⃣ Backend (Spring Boot) Setup

cd server  
mvn clean install  
mvn spring-boot:run  
Configure application.properties for MySQL database.
API runs at: http://localhost:8010


3️⃣ Frontend (React) Setup

cd client  
npm install  
npm run dev  
React App runs at: http://localhost:5173

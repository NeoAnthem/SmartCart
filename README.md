# 🛒 SmartCart

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A modern full-stack e-commerce web application built using **Spring Boot**, **React**, and **MySQL**. SmartCart provides a complete online shopping experience with secure JWT authentication, role-based access control, an intuitive customer interface, and a powerful admin dashboard for managing products, users, orders, inventory, and reports.

This project was developed as a full-stack portfolio project to demonstrate modern web development practices, responsive UI design, secure authentication, RESTful APIs, and scalable application architecture.

---


## 🎯 Project Goals

SmartCart was built to demonstrate:

- Full Stack Java Development


- REST API Design


- Spring Security & JWT Authentication


- React Frontend Development


- Role-Based Access Control


- Responsive UI Design


- Database Design with MySQL


- Clean Layered Architecture


---

## 🌐 Live Demo

| Application | Link |
|-------------|------|
| Frontend | Coming Soon |
| Backend API | Coming Soon |
| Swagger UI | Coming Soon |


---

> **Repository Highlights**
>
> - 🔐 Secure JWT Authentication & Authorization
> 
> 
> - 🛒 Complete E-Commerce Workflow
> 
> 
> - 📱 Fully Responsive UI
> 
> 
> - 📊 Admin Dashboard & Analytics
> 
> 
> - ❤️ Wishlist & Shopping Cart
> 
> 
> - ⭐ Product Reviews & Ratings
> 
> 
> - 🖼 Image Upload Support
> 
> 
> - 📦 Inventory & Order Management


---

## 🧰 Built With

- Spring Boot


- Spring Security


- Hibernate


- React


- MySQL


- JWT Authentication


- Maven

---

## 📑 Table of Contents

- Features


- Tech Stack


- Project Architecture


- Screenshots


- Installation


- API Documentation


- Future Roadmap


- Contributing


- Author


- License


---
## ✨ Features

### 👤 Customer Features

- User Registration & Login


- JWT Authentication


- Secure Role-Based Authorization (RBAC)


- Browse Products


- Search Products


- Category Filtering
    

- Product Sorting


- Pagination


- Product Details Modal


- Shopping Cart


- Wishlist


- Coupon Support


- Checkout


- Order History


- Order Tracking


- Product Reviews


- Profile Management

---

### 👨‍💼 Admin Features

- Admin Dashboard


- User Management


- Product Management


- Category Management


- Order Management


- Inventory Tracking


- Sales Reports


- Revenue Analytics


- Low Stock Alerts


- Product Image Upload

---

### 🎨 UI / UX

- Modern Glassmorphism Design


- Fully Responsive Layout


- Responsive Admin Dashboard


- Responsive Tables


- Responsive Forms


- Responsive Navbar


- Responsive Dialogs


- Modern Confirmation Dialogs


- Reusable Loading Spinner


- Professional Notifications

---

# 🛠 Tech Stack

## Backend

- Java 21


- Spring Boot


- Spring Security


- JWT Authentication


- Spring Data JPA


- Hibernate


- Maven


- MySQL

## Frontend

- React


- React Router


- Axios


- React Toastify


- React Icons


- CSS3

## Tools

- IntelliJ IDEA


- VS Code


- Postman


- MySQL Workbench


- Git


- GitHub

---

# 🏗 Project Architecture

SmartCart follows a modern client-server architecture.

```
                 +-----------------------+
                 |     React Frontend    |
                 +----------+------------+
                            |
                     REST API (Axios)
                            |
                 +----------v------------+
                 |   Spring Boot Backend |
                 +----------+------------+
                            |
                      Spring Security
                            |
                           JWT
                            |
                 +----------v------------+
                 |        MySQL          |
                 +-----------------------+
```

### Backend Layers

- Controller Layer


- Service Layer


- Repository Layer


- Entity Layer


- DTO Layer


- Security Layer (JWT + Spring Security)

---



# 📁 Project Structure

```
SmartCart
│
├── smartcart-backend/      # Spring Boot Backend
├── smartcart-frontend/     # React Frontend
├── uploads/                # Product Images
├── database/               # Database Scripts
├── docs/                   # Screenshots & Documentation
├── README.md
├── LICENSE
└── .gitignore
```


---

# 📸 Application Screenshots

## 🔐 Authentication

### Login

![Login](docs/screenshots/Login%20Page.png)

### Register

![Register](docs/screenshots/Register%20Page.png)

---

## 🛍 Customer Module

### Products

#### Products Page 

![Products 1](docs/screenshots/Products%20Page%20-%201.png)


---

### Product Details

#### Product Details Modal 1

![Product Details 1](docs/screenshots/Product%20Details%20Modal%20-%201.png)

#### Product Details Modal 2

![Product Details 2](docs/screenshots/Product%20Details%20Modal%20-%202.png)

#### Product Details Modal 3

![Product Details 3](docs/screenshots/Product%20Details%20Modal%20-%203.png)

---

### Cart

#### Cart 1

![Cart 1](docs/screenshots/Cart%20-%201.png)

#### Cart 2

![Cart 2](docs/screenshots/Cart%20-%202.png)


#### Cart 4

![Cart 4](docs/screenshots/Cart%20-%204.png)

---

### Wishlist

#### Wishlist 1

![Wishlist 1](docs/screenshots/Wishlist%20-%201.png)

#### Wishlist 2

![Wishlist 2](docs/screenshots/Wishlist%20-%202.png)

---

### Orders


#### Orders 

![Orders 4](docs/screenshots/Orders%20-%204.png)


---

### Profile

#### Profile 

![Profile 1](docs/screenshots/Profile%20-%201.png)

---

## 👨‍💼 Admin Module

### Dashboard

#### Dashboard 1

![Dashboard 1](docs/screenshots/Dashboard%20-%201.png)

#### Dashboard 2

![Dashboard 2](docs/screenshots/Dashboard%20-%202.png)

#### Dashboard 3

![Dashboard 3](docs/screenshots/Dashboard%20-%203.png)

#### Dashboard 4

![Dashboard 4](docs/screenshots/Dashboard%20-%204.png)

---

### Products Management

#### Products Management 1

![Products Management 2](docs/screenshots/Products%20Management%20-%202.png)

---

### Categories Management

![Categories](docs/screenshots/Categories%20Management.png)

---

### Orders Management

#### Orders Management 1

![Orders Management 1](docs/screenshots/Orders%20Management%20-%201.png)

---

### Users Management

#### Users Management 1

![Users Management 2](docs/screenshots/Users%20Management%20-%202.png)

---

### Reports

#### Reports 1

![Reports 1](docs/screenshots/Reports%20-%201.png)

#### Reports 2

![Reports 2](docs/screenshots/Reports%20-%202.png)

#### Reports 3

![Reports 3](docs/screenshots/Reports%20-%203.png)


---

# ⚙️ Installation Guide

## 📋 Prerequisites

Before running SmartCart, ensure the following software is installed on your system:

### Backend

- Java JDK 21 or later


- Maven 3.9+


- MySQL Server 8.0+


- IntelliJ IDEA (Recommended)

### Frontend

- Node.js (v18 or later)


- npm (comes with Node.js)


- VS Code (Recommended)

### Other Tools

- Git


- Postman (Optional, for API testing)


- MySQL Workbench (Recommended)

---

# 📥 Clone the Repository

```bash
git clone https://github.com/NeoAnthem/SmartCart.git
cd SmartCart
```

---

## 🗄 Database Setup

### 1. Create the database

```sql
CREATE DATABASE smartcart_db;
```

### 2. Import the database

Import:

```
database/smartcart_db.sql
```

using MySQL Workbench.

The database already contains:

- Demo Users


- Categories


- Products


- Coupons


- Orders


- Reviews


- Wishlist


- Product Images References

### 3. Configure Backend

Create:

```
application.properties
```

from

```
application-example.properties
```

Configure your database username and password.

### 4. Run Backend

Start the Spring Boot application.

### 5. Run Frontend

```
npm install

npm run dev
```

# 🔑 Demo Accounts

Use the following accounts after importing the demo database.

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@smartcart.com | admin |
| Customer | customer@smartcart.com | customer |
| Customer | customer01@smartcart.com | customer |
| Customer | customer02@smartcart.com | customer |
| Customer | customer03@smartcart.com | customer |

---

# 🖼 Product Images

The repository includes the `uploads/` directory containing demo product images.

No manual image upload is required after importing the provided database.

If you add new products through the Admin Panel, you can upload additional images from the application.

---
# 🔧 Backend Configuration

Navigate to

```
smartcart-backend/smartcart-backend/src/main/resources/
```

Copy

```
application-example.properties
```

Rename it to

```
application.properties
```

Configure the following values:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartcart_db

spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD

jwt.secret=YOUR_SECRET_KEY

spring.mail.username=YOUR_GMAIL_ADDRESS
spring.mail.password=YOUR_GMAIL_APP_PASSWORD
```

---

# ⚛ Frontend Configuration

Navigate to

```
smartcart-frontend/
```

Copy

```
.env.example
```

Rename it to

```
.env
```

Configure

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

# ▶ Running the Backend

Open the backend project in IntelliJ IDEA.

Run

```
SmartcartBackendApplication.java
```

or use Maven

```bash
mvn spring-boot:run
```

Backend will start at

```
http://localhost:8080
```

---

# ▶ Running the Frontend

Navigate to

```
smartcart-frontend
```

Install dependencies

```bash
npm install
```

Start the React development server

```bash
npm run dev
```

Frontend will start at

```
http://localhost:5173
```

---

# 📖 API Documentation

After starting the backend, Swagger UI is available at:

```
http://localhost:8080/swagger-ui/index.html
```

Swagger can be used to explore and test all available REST APIs.

---

# ⚠ Known Limitations

The current version of SmartCart is intended as a portfolio project and demonstration of full-stack development concepts.

Current limitations include:

- 🖼 Product images are stored locally in the `uploads/` directory rather than cloud storage.


- 💳 Payment processing is simulated and does not integrate with a real payment gateway.


- 📧 Email functionality requires a configured Gmail App Password to send emails.


- ☁ The application is designed for local development by default and requires deployment configuration for production environments.

---
# 🚀 Key Highlights

- 🔐 Secure JWT Authentication & Authorization


- 👥 Role-Based Access Control (Admin & Customer)


- 🛒 Complete E-Commerce Workflow


- 📦 Inventory Management


- 📈 Interactive Admin Dashboard


- 📊 Sales Reports & Analytics


- ❤️ Wishlist & Shopping Cart


- ⭐ Product Reviews & Ratings


- 📱 Fully Responsive Design


- 🖼 Product Image Upload


- ⚡ RESTful API Architecture


- 🧩 Clean Layered Backend Architecture


- 🎨 Modern Glassmorphism UI


---

# 🚀 Future Roadmap

The following features are planned for future releases:

- 💳 Online Payment Gateway Integration (Stripe / Razorpay)


- 📧 Email Order & Shipping Notifications


- 🤖 AI-Based Product Recommendations


- 🔎 Elasticsearch Powered Search


- 🌙 Dark / Light Theme


- ☁ Cloud Image Storage (AWS S3 / Cloudinary)


- 🐳 Docker & Docker Compose Support


- 🔄 CI/CD Pipeline using GitHub Actions


- 🧪 Unit & Integration Testing


- 📱 Progressive Web App (PWA)


- 📍 Live Order Tracking


- 🌍 Multi-language Support

---


# 🤝 Contributing

Contributions, suggestions, and improvements are always welcome.

If you would like to contribute:

1. Fork the repository.


2. Create a feature branch.


3. Commit your changes.


4. Push your branch.


5. Open a Pull Request.

Please ensure that any new features follow the existing project structure and coding standards.

---


# 👨‍💻 Author

## Darshan Takarkhede

Aspiring Full Stack Java Developer passionate about building scalable, secure, and user-friendly web applications.

- 💻 GitHub: https://github.com/NeoAnthem


- 💼 LinkedIn: https://www.linkedin.com/in/darshan-takarkhede-168937252/


- 📧 Email: takarkhede52@gmail.com

If you found this project useful or inspiring, please consider giving it a ⭐ on GitHub.

---


# 📊 Project Statistics

| Category | Details |
|----------|---------|
| Backend | Spring Boot |
| Frontend | React |
| Database | MySQL |
| Authentication | JWT |
| Authorization | Role-Based Access Control (RBAC) |
| Architecture | RESTful Client-Server |
| Responsive Design | ✅ Fully Responsive |
| Image Upload | ✅ Supported |
| Admin Dashboard | ✅ Available |
| Reports & Analytics | ✅ Available |
| Java Version | 21 |
| Spring Boot | 3.x |
| React | 19 |
| Database Export | Included |
| Demo Data | Included |
| Responsive UI | Desktop + Tablet + Mobile |

---

# 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for more information.
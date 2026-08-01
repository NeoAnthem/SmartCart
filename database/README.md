# 🗄 SmartCart Database

This directory contains the complete MySQL database dump for the **SmartCart** application.

The SQL dump includes both the database schema and sample data, allowing you to run the application immediately without manually creating tables or inserting records.

---

# 📦 What's Included?

The database already contains:

- 👑 Administrator Account


- 👤 Demo Customer Accounts


- 📂 Product Categories


- 📦 Products


- ❤️ Wishlist Data


- 🛒 Shopping Cart Data


- 📋 Orders


- ⭐ Product Reviews


- 🎟 Coupon Codes


- 📊 Dashboard & Analytics Data


- 🔗 Cloudinary Product Image URLs

> **Note:** Product images are hosted on **Cloudinary**. The database stores secure Cloudinary image URLs, so no local `uploads/` folder is required.

---

# ⚙️ Database Setup

## Step 1️⃣ Create the Database

Open **MySQL Workbench** and execute:

```sql
CREATE DATABASE smartcart_db;
```

---

## Step 2️⃣ Import the Database

Import

```text
smartcart_db.sql
```

into the newly created database.

The SQL file automatically creates:

- Database Schema


- Tables


- Relationships


- Constraints


- Sample Data

No additional SQL scripts are required.

---

## Step 3️⃣ Configure the Backend

Navigate to

```text
smartcart-backend/src/main/resources/
```

Copy

```text
application-example.properties
```

Rename it to

```text
application.properties
```

Configure your environment variables or database credentials:

```properties
DB_URL=jdbc:mysql://localhost:3306/smartcart_db
DB_USERNAME=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

---

## Step 4️⃣ Start the Application

Run the Spring Boot backend.

Run the React frontend.

The application is now ready to use.

---

# 🔑 Demo Accounts

The imported database already contains demo accounts.

| Role | Email | Password |
|------|-------|----------|
| 👑 Administrator | admin@smartcart.com | admin |
| 🛒 Customer | customer@smartcart.com | customer |
| 🛒 Customer | customer01@smartcart.com | customer |
| 🛒 Customer | customer02@smartcart.com | customer |
| 🛒 Customer | customer03@smartcart.com | customer |

---

# ☁ Product Images

SmartCart uses **Cloudinary** for cloud-based image storage.

When the sample database is imported:

- ✅ Product image URLs are already configured.


- ✅ No manual image upload is required.


- ✅ No local `uploads/` directory is required.


- ✅ Images work in both local and deployed environments.

---

# 🚀 Production Deployment

The production version of SmartCart uses:

| Component | Platform |
|-----------|----------|
| 🗄 Database | Railway MySQL |
| ☁ Image Storage | Cloudinary |
| 🌱 Backend | Render |
| ⚛ Frontend | Vercel |

---

# 📚 Related Documentation

For complete project setup, architecture, environment variables, deployment instructions, screenshots, and API documentation, refer to the main project README.

```
../README.md
```

---

## 📄 License

This database is distributed under the same **MIT License** as the SmartCart project.
# SmartCart Database

This folder contains the complete database dump used by the SmartCart application.

The provided database already includes:

- Demo Admin Account
- Demo Customer Accounts
- Categories
- Products
- Coupons
- Orders
- Reviews
- Wishlist
- Product Images References

---

## Database Setup

### Step 1

Open MySQL Workbench.

Create a database.

```sql
CREATE DATABASE smartcart_db;
```

---

### Step 2

Import

```
smartcart_db.sql
```

into the newly created database.

The SQL file already contains:

- Database structure
- Tables
- Relationships
- Demo data

No additional SQL scripts are required.

---

### Step 3

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

Configure your MySQL username and password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartcart_db
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

### Step 4

Run the Spring Boot backend.

---

### Step 5

Run the React frontend.

The application is ready to use.

---

## Product Images

The repository includes the **uploads/** directory containing all demo product images.

No additional image upload is required.

---

## Demo Accounts

Refer to the main project README for the demo login credentials.
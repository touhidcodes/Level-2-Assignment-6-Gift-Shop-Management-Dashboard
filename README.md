# Level-2 Assignment-6 Gift Shop Management Dashboard

The Gift Shop Management Dashboard is a comprehensive system designed to efficiently manage a gift shop's inventory, track sales, and analyze sales history. The dashboard incorporates features such as authentication, CRUD operations, state management, real-time UI updates, and gift filtering.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- Typescript installed
- React Router installed
- Redux Toolkit installed
- React Hook Form installed

## Features

#### Authentication

- User Registration and Login
- Users must register and log in to access the dashboard.
- JWT (JSON Web Tokens) is used for secure authentication.
- A single role (user) is implemented for managing the system.
- Gift Shop Management

#### CRUD Operations

- Add, delete, update, and view gifts in the inventory.
- Robust filtering system for effective gift selection.
- Sales Management
- Search and sell products.
- Sales form with fields: quantity, buyer's name, and sale date.
- If quantity reaches zero, the product is removed from the inventory.
- View sales history categorized by week, day, month, and year.

#### Gift Filtering

- Comprehensive Filtering System
- Filter by price range.
- Filter by occasion (e.g., birthdays, anniversaries, holidays).
- Real-time search for gift recipients (optional).
- Filter by category, theme, brand, and additional parameters.

#### User Interface Features

- Real-time UI updates for changes (e.g., product updates, sales).
- Utilization of RTK Query for efficient CRUD operations.
- Re-fetching functionality for data accuracy.
- Bulk delete feature for efficient inventory management.
- Duplicate & Edit feature for creating variants.

#### State Management

- Utilization of Redux for consistent application state.
- Technical Requirements
- Use of RTK Query for efficient CRUD operations.
- Implementation of Redux for state management.
- UI updates gracefully in real time.
- Re-fetching functionality for data accuracy.

## Getting Started

Follow these steps to get your project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-touhidcodes
   ```

2. **Navigate to the project folder:**

```
cd your-repository
```

3. **Install dependencies:**

```
npm install
```

4. **Configure environment variables:**
   Create a .env file in the project root and configure any necessary environment variables. For example:

```
BASE_URL=https://gift-shop-management-server-omega.vercel.app/api
BASE_LOCAL=http://localhost:5000/api
```

3. **Run the application:**

```
npm run dev
```

Your application should now be running at http://localhost:5173.

## User Login Credentials

```
# Super Admin Login:
· Username: super@assignment6
· Password: super@assignment6

# Manager Login:
· Username: manager@assignment6
· Password: manager@assignment6

# Seller Login:
· Username: seller@assignment6
· Password: seller@assignment6
```

```
# Coupon Code 1:
· Coupon: TOUHIDCODES
· Discount: 12%

# Coupon Code 2:
· Coupon: 21Language
· Discount: 10%
```

## Live URLs

#### Live Project URL: https://gift-shop-management-client.web.app/

#### Live API URL: https://gift-shop-management-server-omega.vercel.app/api

## Project Dependencies

#### Dependencies List

```
 "dependencies": {
    "@react-pdf/renderer": "^3.3.8",
    "@reduxjs/toolkit": "^2.1.0",
    "@types/react-datepicker": "^4.19.5",
    "firebase": "^10.8.0",
    "jwt-decode": "^4.0.0",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.3",
    "moment": "^2.30.1",
    "react": "^18.2.0",
    "react-datepicker": "^5.0.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.3",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.21.3",
    "redux-persist": "^6.0.0",
    "sonner": "^1.4.0",
    "sort-by": "^0.0.2"
  },
```

#### Dev Dependencies List

```
 "devDependencies": {
 "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "daisyui": "^4.6.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
    }
```

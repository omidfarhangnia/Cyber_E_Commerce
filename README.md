# 🛍️ Cyber E-Commerce | A Modern Full-Stack Storefront

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://cyber-e-commerce-six.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A full-stack e-commerce application built with Next.js 15, Prisma, and Tailwind CSS. This project features a pixel-perfect implementation of a professional Figma design, complete with essential e-commerce functionalities like user authentication, a dynamic shopping cart, a favorites system, and instant loading states for an optimal user experience.

---

### 🔗 **Live Demo**

**[https://cyber-e-commerce-six.vercel.app](https://cyber-e-commerce-six.vercel.app)**

### 📸 **Project Preview**

[![Cyber E-Commerce Homepage Preview](https://raw.githubusercontent.com/omidfarhangnia/Cyber_E_Commerce/main/assets/project-homepage.JPG)](https://cyber-e-commerce-six.vercel.app/)

---

## ✨ Key Features

-   **🔐 Secure Authentication:** Full user registration and login system built with **Auth.js (NextAuth v5)** and password hashing using `bcryptjs`.
-   **🛒 Dynamic Shopping Cart:** Add, remove, and view products in a persistent shopping cart.
-   **❤️ Favorites System:** Allow users to "like" and save products to their personal wishlist.
-   **⚡ Instant Loading States:** Utilizes Next.js 15 App Router features like Suspense for **UI Streaming**, providing instant feedback to users.
-   **✨ Smooth Animations:** Engaging and smooth user interface animations powered by **GSAP**.
-   **📱 Fully Responsive Design:** A pixel-perfect, mobile-first design that looks great on all devices, built with **Tailwind CSS**.
-   **🔍 Product Search & Filtering:** Easily find products with an intuitive search and filtering system.

---

## 🛠️ Tech Stack

This project uses a modern, full-stack architecture:

| Category      | Technology                                                                          |
|---------------|-------------------------------------------------------------------------------------|
| **Framework** | [**Next.js 15**](https://nextjs.org/) (App Router)                                  |
| **Frontend** | [**React 19**](https://react.dev/), [**GSAP**](https://gsap.com/) for animations     |
| **Styling** | [**Tailwind CSS**](https://tailwindcss.com/)                                        |
| **Backend** | [**Auth.js (NextAuth v5)**](https://authjs.dev/)                                    |
| **Database** | [**Vercel Postgres**](https://vercel.com/storage/postgres) / [**Neon DB**](https://neon.tech/) |
| **ORM** | [**Prisma**](https://www.prisma.io/)                                                |
| **Dev Tools** | [**Prettier**](https://prettier.io/) for code formatting, TypeScript                |

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Prerequisites

Make sure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/en/) (v18 or higher)
-   `pnpm` (or your preferred package manager)

### 2. Clone the Repository

```bash
git clone [https://github.com/omidfarhangnia/Cyber_E_Commerce.git](https://github.com/omidfarhangnia/Cyber_E_Commerce.git)
cd Cyber_E_Commerce
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following variables. You can get the database URL from your Vercel Postgres or Neon DB dashboard.

```env
# .env.local

# Get this from your Neon or Vercel Postgres dashboard
DATABASE_URL="your_database_connection_string"

# Generate a secure secret for NextAuth using: openssl rand -base64 32
AUTH_SECRET="your_auth_secret_key"
```

### 5. Sync Database Schema

Push the Prisma schema to your database. This will create the necessary tables.

```bash
npx prisma db push
```

### 6. Run the Development Server

```bash
pnpm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

---

## 🎨 Design and Credits

The UI/UX for this project is based on the **E-Commerce UI Kit** available on the Figma Community, which is licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

-   **Original Design:** [E-Commerce UI Kit on Figma Community](https://www.figma.com/community/file/1301450122530609595)

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## 👤 Contact

**Omid Farhangnia**
-   **GitHub:** [@omidfarhangnia](https://github.com/omidfarhangnia)
-   **LinkedIn:** [Omid Farhangnia](https://www.linkedin.com/in/omid-farhangnia-20a122202/)
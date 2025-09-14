# **Mini Seller Console**

The **Mini Seller Console** is a lightweight CRM-style tool designed to help triage leads and quickly convert them into opportunities. It provides a simple interface where users can view, search, filter, and update leads, as well as create and manage opportunities without needing a backend service.  

The project loads its data from a local JSON file and simulates API calls with `setTimeout`, making it feel closer to a real-world app experience.  

---

## 🔍 **Table of Contents**
* [Features](#-features)  
* [Demo](#-demo)  
* [Development Process](#-development-process)  
* [How to Run](#-how-to-run)  
* [Technologies](#-technologies)  
* [Author](#-author)  

---

## 💻 **Features**
- [x] Lead management: view, search, filter, and sort leads  
- [x] Detail side panel with inline editing (status + email with validation)  
- [x] Convert leads into opportunities with stage and optional amount  
- [x] Local persistence for filters and leads using `localStorage`  
- [x] Loading, empty, and error states  
- [x] Optimistic updates with rollback on simulated failure  
- [x] Responsive layout (desktop → mobile)  

---

## 🎯 **Demo**
[Deploy](https://mini-seller-console-beta.vercel.app/)

---

## 👨🏻‍💻 **Development Process**
I started by setting up the project with **React + Vite** and **Tailwind CSS** for quick styling.  

The first step was building the lead list table with search, filter, and sort options. Then I added the side panel for lead details, including inline editing with validation.  

After that, I implemented the "Convert Lead" feature to generate opportunities, displayed in their own table. To make the app feel more realistic, I added optimistic updates with rollback logic and persisted state with `localStorage`.  

Finally, I refined the UX to ensure it works well on both desktop and mobile.  

---

## 🕹 **How to Run**

```bash
git clone https://github.com/brunomaschietto/mini-seller-console

cd Front-End

npm install

npm run dev

```

## ⚙️ **Technologies**

1. [React](https://pt-br.reactjs.org/)
2. [Vite](https://vite.dev/)
3. [Tailwind CSS](https://tailwindcss.com/)

## 👩🏻‍💻 **Author**

<p>Bruno Maschietto Simões Cruz</p>

[LinkedIn](https://www.linkedin.com/in/bruno-maschietto/)
# StoryBook 📖

A full-stack **Story Publishing Platform** where users can create, manage, and publish stories publicly. The application supports authentication, private dashboards, public story feeds, image uploads, and live publishing — built with modern web technologies and deployed on **AWS EC2 with Nginx**.

🌐 **Live Domain:** [https://randomthing.co.in](https://randomthing.co.in)

---

## ✨ Features

* 🔐 User Authentication (Signup / Signin)
* 📝 Create, Edit, Delete Stories
* 🌍 Publish Stories to Public Feed (Go Live)
* 🖼️ Image Upload Support (Cloudinary)
* 📊 User Dashboard
* ⚡ Instant UI updates without page refresh
* 🔒 Protected Routes
* 🌙 Dark UI (Clean & Minimal Design)

---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Recoil** (State Management)
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL**
* **JWT Authentication**
* **Multer + Cloudinary** (Image Uploads)

### Dev & Deployment

* **pnpm + Turborepo**
* **AWS EC2 (Ubuntu)**
* **Nginx (Reverse Proxy)**
* **PM2 (Process Manager)**
* **Vercel (Frontend)**

---

## 🚀 Deployment Architecture

* **Frontend:** Deployed on Vercel
* **Backend:** Deployed on AWS EC2
* **Reverse Proxy:** Nginx
* **Domain:** randomthing.co.in
* **SSL:** Enabled via Nginx

```
User → Domain (Nginx) → Backend (Node.js API)
                    ↘ Frontend (Vercel)
```

---

## 🔑 Environment Variables

### Backend (.env)

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
PORT=5000
```

### Frontend (.env)

```

```

---

## 🧪 Local Development

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/storybook.git
cd storybook
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Start Backend

```bash
pnpm run dev
```

### 4️⃣ Start Frontend

```bash
pnpm run dev
```

---

## 📌 API Highlights

* `POST /signup` – Create account
* `POST /signin` – Login
* `POST /create` – Create story
* `PUT /feature/:id` – Publish story
* `GET /Story-Book` – Public stories
* `GET /Story-Book/:id` – Single public story

---


## 🧠 Learning Outcomes

* Real-world full stack architecture
* Secure authentication & authorization
* State synchronization without refresh
* Production deployment with AWS & Nginx
* Scalable monorepo structure

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Ayush Yadav**
Full Stack Developer

If you like this project, give it a ⭐ on GitHub!

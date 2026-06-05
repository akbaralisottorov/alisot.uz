# alisot.uz — Portfoliom va Blog Sahifam

Akbarali Sottorovning marketing strategiyasi, brend kommunikatsiyalari va mutolaa kundaligiga asoslangan shaxsiy portfoliom va blog veb-sayti. Loyiha React + Vite (Frontend), Express (Backend Server) va Prisma ORM + PostgreSQL stacklari yordamida qurilgan.

---

## 🚀 Mahalliy Ishga Tushirish (Local Run)

### Talablar:
- Node.js (v18 yoki undan yuqori)
- PostgreSQL ma'lumotlar bazasi (yoki Neon.tech hisobi)

### Qadamlar:
1. **Kutubxonalarni o'rnatish**:
   ```bash
   npm install
   ```

2. **Sozlamalar (.env)**:
   `.env.example` faylini nusxalab `.env` nomli fayl yarating va barcha kerakli kalitlarni (DATABASE_URL, OpenAI, Gemini va boshqalar) to'ldiring:
   ```bash
   cp .env.example .env
   ```

3. **Prisma va Ma'lumotlar Bazasini Sozlash**:
   Baza sxemasini yuklash va dastlabki ma'lumotlarni (seed) kiritish:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Loyihani ishga tushirish**:
   ```bash
   npm run dev
   ```
   Loyiha [http://localhost:3000](http://localhost:3000) manzilida ishga tushadi.

---

## 🌐 Serverga Yuklash Qo'llanmasi (Deployment Guide)

Loyiha ma'lumotlar bazasi uchun **Neon.tech** va server/frontend hostingi uchun **Vercel** xizmatlaridan foydalanadi.

### 1-Bosqich: Neon.tech Bazasini Sozlash
1. [Neon.tech](https://neon.tech) saytiga kiring va yangi loyiha yarating.
2. PostgreSQL versiyasini tanlang (15 yoki 16 tavsiya etiladi).
3. Loyiha panelidan **Connection String** (DATABASE_URL) manzilini nusxalab oling. U quyidagicha ko'rinishda bo'ladi:
   `postgresql://username:password@ep-host-name.region.aws.neon.tech/neondb?sslmode=require`
4. Bu havolani o'zingizning `.env` faylingizdagi `DATABASE_URL` qiymatiga joylashtiring.

### 2-Bosqich: Vercel Hostingga Joylash
Loyiha Express serverini serverless funksiya sifatida ishlatish uchun `vercel.json` fayli orqali to'liq sozlangan.

1. [Vercel](https://vercel.com) loyiha paneliga kiring va GitHub repozitoriyangizni ulang.
2. Vercel loyiha sozlamalarida **Environment Variables** (Muhit o'zgaruvchilari) bo'limiga quyidagi kalitlarni qo'shing:
   - `DATABASE_URL`: Neon.tech dan olingan havola.
   - `OPENAI_API_KEY`: Semantik qidiruv va embeddinglar uchun OpenAI API kaliti.
   - `ADMIN_PASSWORD`: Admin paneliga kirish uchun xavfsiz parol.
   - `APP_URL`: Saytingizning asosiy domen manzili (masalan: `https://alisot.uz`).
   - `GEMINI_API_KEY`: Sun'iy intellekt xususiyatlari uchun Gemini API kaliti.
3. **Deploy** tugmasini bosing. Vercel avtomatik ravishda `vercel.json` dagi sozlamalarni o'qiydi va loyihani quyidagi tartibda build qiladi:
   - Prisma Client generatsiyasi (`prisma generate`)
   - TypeScript tekshiruvi (`tsc`)
   - Frontend build jarayoni (`vite build`)
   - Express serverless funksiyasini yuklash

### 3-Bosqich: Ma'lumotlar Bazasini Migratsiya Qilish
Vercelga yuklash yakunlangandan so'ng, Neon.tech dagi jonli bazangizda jadvallar yaratish uchun o'zingizning kompyuteringiz terminalidan (mahalliy `.env` faylida Neon database url yozilgan holatda) quyidagi buyruqni ishga tushiring:

```bash
# Bazada jadvallarni yaratish
npx prisma db push

# Baza uchun dastlabki admin foydalanuvchisini yaratish (seed)
npx prisma db seed
```

Tayyor! Saytingiz Vercel serverless tizimida mukammal va tezkor ishlaydi.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create tags for articles
  const tagsData = [
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'React' },
    { name: 'Next.js' },
  ];

  for (const t of tagsData) {
    await prisma.tag.upsert({
      where: { name: t.name },
      update: {},
      create: t,
    });
  }
  const tags = await prisma.tag.findMany();

  // Create categories for articles
  const categoriesData = [
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'Full-stack' },
  ];

  for (const c of categoriesData) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    });
  }
  const categories = await prisma.category.findMany();

  // Create a user
  const user = await prisma.user.upsert({
    where: { email: 'akbaraliy.phone@gmail.com' },
    update: {},
    create: {
      email: 'akbaraliy.phone@gmail.com',
      name: 'Akbarali Sottorov',
    },
  });

  // Create an article
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    const article = await prisma.article.create({
      data: {
        title: 'Hello Prisma with PostgreSQL',
        slug: 'hello-prisma-postgres',
        excerpt: 'First post powered by Prisma',
        content: 'This is my first article created from seed.',
        status: 'PUBLISHED',
        authorId: user.id,
        categories: {
          connect: categories.map(c => ({ id: c.id })),
        },
        tags: {
          connect: tags.map(t => ({ id: t.id })),
        },
      },
    });
    console.log(`Created article: ${article.title}`);
  }

  // --- Seed Book Categories ---
  const bookCategoriesData = [
    { name: 'Behavioral Economics' },
    { name: 'Political Science' },
    { name: 'Marketing' },
    { name: 'Fiction' },
    { name: 'History' },
  ];

  console.log('Seeding book categories...');
  const bookCategories: Record<string, any> = {};
  for (const bc of bookCategoriesData) {
    const created = await prisma.bookCategory.upsert({
      where: { name: bc.name },
      update: {},
      create: bc,
    });
    bookCategories[bc.name] = created;
  }

  // --- Seed Books ---
  console.log('Seeding books...');
  
  // Clean up existing books to avoid duplication
  await prisma.book.deleteMany();

  const booksData = [
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      slug: "thinking-fast-and-slow",
      status: "READING",
      progress: 45,
      rating: null,
      categoryName: "Behavioral Economics",
      coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400",
      summary: "Fikrlarimiz ikki tizimga bo'linadi: tezkor va intuitiv Tizim 1, hamda sekinroq, mantiqiy Tizim 2. Kitob inson qaror qabul qilish jarayonidagi xatoliklar, kognitiv og'ishlar va iqtisodiy xatti-harakatlarni tushuntiradi.",
      keyIdeas: "1. Tizim 1 (Tezkor fikrlash): Intuitiv, hissiy, avtomatik va juda tez ishlaydi. Kam energiya sarflaydi, lekin xatolarga moyil.\n2. Tizim 2 (Sekin fikrlash): Diqqatni jamlashni talab qiladi, mantiqiy, hisob-kitobli va sekin. Ko'p energiya talab qiladi, shuning uchun miyamiz dangasalik qilib Tizim 1 ga tayanadi.\n3. Kognitiv og'ishlar (Anchoring, Availability Heuristic, Loss Aversion): Insonlar ratsional qaror qabul qilmaydi, balki kognitiv tuzoqlarga oson tushadi.",
      favoriteQuotes: "- 'Biz o'zimizni ratsional deb o'ylaymiz, lekin ko'pincha Tizim 1 bizning xatti-harakatlarimizni boshqaradi va biz buni sezmaymiz ham.'\n- 'Miyaning eng muhim qonuni: kamroq harakat qilish qonunidir.'",
      personalInsights: "Marketing va brendingda insonlar qarorini tushunish uchun fundamental asar. Odamlar reklama ko'rganda Tizim 1 bilan tezda his qilishadi, lekin ularni ishontirish uchun ba'zida Tizim 2 ga ta'sir qilish lozim. Biroq eng muhimi, Tizim 1 ning og'ishlaridan to'g'ri foydalana bilishdir."
    },
    {
      title: "Influence",
      author: "Robert Cialdini",
      slug: "influence",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "Marketing",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      summary: "Insonlarga ta'sir o'tkazish va ishontirishning 6 ta asosiy psixologik tamoyili haqida asar.",
      keyIdeas: "1. O'zaro almashinuv (Reciprocity): Biror kishiga yaxshilik qilsangiz, u ham sizga qaytarishga majbur his qiladi.\n2. Majburiyat va barqarorlik (Commitment and Consistency): Odamlar bir marta bergan va'dalari yoki qarorlariga sodiq qolishga harakat qiladi.\n3. Ijtimoiy isbot (Social Proof): Odamlar boshqalarning qilayotgan ishlariga qarab yo'l tutadi.",
      favoriteQuotes: "- 'Boshqalardan nimanidir so'rashdan oldin, ularga nimadir bering.'\n- 'Ijtimoiy isbot shunchalik kuchliki, u bizni o'z ko'zlarimizga ishonmaslikka majbur qilishi mumkin.'",
      personalInsights: "Strategik marketingda Cialdini tamoyillari har qadamda ishlatiladi. Masalan, bepul namuna (reciprocity) yoki mijozlar fikrlari (social proof). Ushbu asar har qanday marketing mutaxassisi uchun eng muhim darslikdir."
    },
    {
      title: "Predictably Irrational",
      author: "Dan Ariely",
      slug: "predictably-irrational",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "Behavioral Economics",
      coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
      summary: "Insonlarning qaror qabul qilishdagi sistematik irratsionalligi haqida. Biz faqat irratsional emasmiz, balki bizning irratsionalligimizni oldindan aytib berish mumkin (predictable).",
      keyIdeas: "1. Nisbiylik tuzog'i (Relativity): Biz narsalarni absolyut qiymatda emas, balki atrofidagilarga solishtirib baholaymiz.\n2. Bepulning kuchi (The Cost of Zero Cost): Bepul narsa bizda kuchli his-tuyg'ularni uyg'otadi va ko'pincha keraksiz narsalarni olishga majbur qiladi.\n3. Ijtimoiy normalar vs Bozor normalari (Social vs Market Norms): Pul aralashgan joyda ijtimoiy normalar yo'qoladi.",
      favoriteQuotes: "- 'Biz faqat irratsional emasmiz, biz oldindan aytib bo'ladigan darajada irratsionalmiz.'\n- 'Bepul narsa bizga yo'qotish xavfisiz tranzaksiyani va'da qiladi.'",
      personalInsights: "Behavioral economics sohasiga kirish uchun ajoyib kitob. Narxlarni shakllantirishda 'anchoring' va nisbiylik qoidalarini qo'llash orqali brendlar o'z sotuvlarini sezilarli darajada oshirishi mumkinligini ko'rsatib beradi."
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      slug: "the-power-of-habit",
      status: "COMPLETED",
      progress: 100,
      rating: 4,
      categoryName: "Behavioral Economics",
      coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400",
      summary: "Odatlar qanday shakllanishi va ularni qanday o'zgartirish mumkinligi haqida ilmiy va amaliy qo'llanma.",
      keyIdeas: "1. Odat halqasi (The Habit Loop): Odat uch bosqichdan iborat: Signal (Cue), Amal (Routine) va Mukofot (Reward).\n2. Oltin qoida (The Golden Rule of Habit Change): Signal va Mukofotni o'zgartirmay, faqat Amalni o'zgartirish orqali odatni o'zgartirish mumkin.\n3. Hal qiluvchi odatlar (Keystone Habits): Boshqa odatlarning o'zgarishiga turtki bo'ladigan asosiy odatlar (masalan, sport bilan shug'ullanish).",
      favoriteQuotes: "- 'Odatlar hech qachon butunlay yo'qolmaydi. Olar miyamizning neyronlarida kodlangan holda qoladi.'\n- 'Agar siz odatni o'zgartirmoqchi bo'lsangiz, uning o'rniga boshqa odat qo'yishingiz kerak.'",
      personalInsights: "Brendingda iste'molchilarning odatlarini tushunish va brendingizni ularning kundalik 'odat halqasi'ga kiritish (masalan, ertalab tish yuvish odatiga aylanib ketgan Pepsodent reklamasi) juda muhim."
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      slug: "sapiens",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "History",
      coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400",
      summary: "Insoniyat tarixini biologik va ijtimoiy evolyutsiya prizmasidan tahlil qiluvchi, bizning qanday qilib yer yuzidagi eng kuchli turga aylanganimizni tushuntiruvchi asar.",
      keyIdeas: "1. Kognitiv inqilob (Cognitive Revolution): Insoniyatning xayoliy narsalarga (miflar, din, pullar, davlatlar) ishonish va ular atrofida hamkorlik qilish qobiliyati.\n2. Qishloq xo'jaligi inqilobi (Agricultural Revolution): Insoniyatni ko'chmanchilikdan muqimlikka o'tkazdi, lekin individual darajada hayot sifatini vaqtinchalik yomonlashtirdi.\n3. Birlashtiruvchi kuchlar: Pul, imperiya va dinlar insoniyatni global dunyoga birlashtirdi.",
      favoriteQuotes: "- 'Biz o'zimiz yaratgan xayoliy tartiblar (pullar, qonunlar, brendlar) ichida yashaymiz.'\n- 'Tarixni bir necha kishi yaratadi, qolganlar esa dalalarda ishlaydi.'",
      personalInsights: "Brendlar ham aslida xayoliy miflardir. Apple yoki Nike shunchaki kompaniya emas, ular odamlarni ma'lum bir g'oya atrofida birlashtiruvchi zamonaviy dinlardir. Sapiens buni tushunishda eng yaxshi qo'llanmadir."
    },
    {
      title: "The Art of War",
      author: "Sun Tzu",
      slug: "the-art-of-war",
      status: "COMPLETED",
      progress: 100,
      rating: 4,
      categoryName: "Political Science",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
      summary: "Qadimgi Xitoy harbiy strategiyasi bo'yicha eng mashhur asar. Bugungi kunda biznes, marketing va siyosatda raqobatbardoshlikni saqlab qolish uchun ishlatiladi.",
      keyIdeas: "1. Eng yaxshi g'alaba: Urushmasdan turib g'alaba qozonish eng oliy mahoratdir.\n2. Moslashuvchanlik: Suv kabi bo'ling - u to'siqlarga qarab o'z shaklini o'zgartiradi.\n3. O'zini va raqibni bilish: Agar o'zingizni va raqibingizni bilsangiz, yuzta jangda ham xavf ostida qolmaysiz.",
      favoriteQuotes: "- 'Hamma urushlar aldovga asoslangan.'\n- 'Agar raqibingiz tez g'azablanadigan bo'lsa, uni asabiylashtiring.'",
      personalInsights: "Marketing - bu zamonaviy urush maydonidir. Cialdini ta'sir o'tkazishni o'rgatsa, Sun Tzu bozorda raqobatchilarni qanday aylanib o'tishni o'rgatadi. Strategiyani to'g'ri rejalashtirish urush boshlanishidan oldin g'alabani ta'minlaydi."
    },
    {
      title: "Why Nations Fail",
      author: "Daron Acemoglu & James A. Robinson",
      slug: "why-nations-fail",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "Political Science",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
      summary: "Nega ba'zi davlatlar boy va boshqalari kambag'al? Mualliflar bunga geografiya yoki madaniyat emas, balki siyosiy va iqtisodiy institutlar (inklyuziv vs ekstraktiv) sababchi ekanini isbotlaydi.",
      keyIdeas: "1. Inklyuziv institutlar: Keng ommani qaror qabul qilishda ishtirok etishga, tadbirkorlik va innovatsiyani rag'batlantirishga imkon beradi.\n2. Ekstraktiv institutlar: Hokimiyat va boylikni bir guruh elitaning qo'lida to'playdi va jamiyat rivojlanishini cheklaydi.\n3. Tarixiy burilish nuqtalari: Kichik tasodiflar yoki burilish nuqtalari davlatlarni turlicha rivojlanish yo'llariga boshlashi mumkin.",
      favoriteQuotes: "- 'Iqtisodiy institutlar jamiyatning boy yoki kambag'al bo'lishini belgilaydi, lekin aynan siyosiy institutlar iqtisodiy institutlarni shakllantiradi.'\n- 'Ekstraktiv institutlar o'zlarining inqirozini o'zlari yaratadilar.'",
      personalInsights: "Davlatlarning rivojlanish qonuniyatlarini tushunish, brendlarning uzoq muddatli barqarorligini tushunishga o'xshaydi. Agar brend (institut) faqat o'ziga tortuvchi (ekstraktiv) bo'lsa, u tezda qulab tushadi. Mijozlarni jalb qiluvchi (inklyuziv) brendlar ise uzoq yashaydi."
    },
    {
      title: "Nudge",
      author: "Richard Thaler & Cass Sunstein",
      slug: "nudge",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "Behavioral Economics",
      coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
      summary: "Odamlarning tanlash erkinligini cheklamasdan, ularni to'g'riroq va foydaliroq qarorlar qabul qilishga undash (nudge) san'ati haqida.",
      keyIdeas: "1. Tanlov arxitekturasi (Choice Architecture): Tanlovlar qanday taqdim etilishi odamlarning qaroriga katta ta'sir qiladi.\n2. Standart sozlamalar (Default Options): Odamlar odatda hech narsani o'zgartirmay, tayyor berilgan variantni tanlashadi.\n3. Liberal paternalizm: Erkinlikni cheklamasdan, inson farovonligi uchun 'turtki' berish.",
      favoriteQuotes: "- 'Agar siz odamlarning qandaydir qarorga kelishini xohlasangiz, buni ular uchun osonlashtiring.'\n- 'Hech qanday neytral dizayn mavjud emas.'",
      personalInsights: "Biznes va marketingda tanlov arxitekturasi sotuv voronkasini yaratishda juda muhimdir. Mijozga to'g'ri 'turtki' berish orqali brendlar ularning hayotini osonlashtiradi va o'z maqsadiga erishadi."
    },
    {
      title: "The Dictator's Handbook",
      author: "Bruce Bueno de Mesquita & Alastair Smith",
      slug: "the-dictators-handbook",
      status: "COMPLETED",
      progress: 100,
      rating: 4,
      categoryName: "Political Science",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
      summary: "Hokimiyat qanday qo'lga kiritilishi, saqlab qolinishi va nima uchun barcha rahbarlar (demokrat yoki diktator) o'xshash qoidalar asosida harakat qilishini tushuntiruvchi siyosiy asar.",
      keyIdeas: "1. Uchta koalitsiya: Nominal selektorat (barcha saylovchilar), Real selektorat (haqiqiy ta'sir ko'rsatuvchilar) va G'olib koalitsiya (rahbarni hokimiyatda ushlab turuvchi eng muhim odamlar).\n2. Hokimiyatning birinchi qoidasi: G'olib koalitsiyani imkon qadar kichik, nominal selektoratni esa imkon qadar katta saqlang.\n3. Sadoqat pul orqali sotib olinadi: Hokimiyatni saqlab qolish uchun pulni g'olib koalitsiyaga yo'naltirish kerak.",
      favoriteQuotes: "- 'Siyosatda yaxshi niyatlar emas, balki hokimiyatni saqlab qolish hisob-kitoblari g'olib chiqadi.'\n- 'Hech bir rahbar yolg'iz boshqarmaydi.'",
      personalInsights: "Kompaniya ichidagi boshqaruv va hamkorlar bilan ishlashda ham xuddi shu qoidalar amal qiladi. G'olib koalitsiyani aniqlash va ularni rag'batlantirish har qanday strateg uchun muhim qobiliyatdir."
    },
    {
      title: "1984",
      author: "George Orwell",
      slug: "1984",
      status: "COMPLETED",
      progress: 100,
      rating: 5,
      categoryName: "Fiction",
      coverImage: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=400",
      summary: "Totalitar tuzum, nazorat va erkinlik cheklanishi haqidagi eng mashhur antiutopik roman.",
      keyIdeas: "1. O'tmishni nazorat qilish: Kim o'tmishni nazorat qilsa, kelajakni ham nazorat qiladi.\n2. Ikkiyoqlama fikrlash (Doublethink): Bir vaqtning o'zida ikkita qarama-qarshi fikrga ishonish qobiliyati.\n3. Katta og'a (Big Brother): Doimiy kuzatuv va shaxsiy hayotning butunlay yo'q qilinishi.",
      favoriteQuotes: "- 'Erkinlik — bu ikki karra ikki to'rt deya olish erkinligidir.'\n- 'Urush — bu tinchlik. Erkinlik — bu qullik. Bilimsizlik — bu kuch.'",
      personalInsights: "Propaganda va axborot oqimining jamiyat fikriga ta'sirini tushunish uchun ajoyib badiiy asar. Siyosat va marketingdagi manipulyatsiya usullarini o'rganishda juda foydali."
    }
  ];

  for (const book of booksData) {
    const category = bookCategories[book.categoryName];
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        slug: book.slug,
        status: book.status,
        progress: book.progress,
        rating: book.rating,
        coverImage: book.coverImage,
        summary: book.summary,
        keyIdeas: book.keyIdeas,
        favoriteQuotes: book.favoriteQuotes,
        personalInsights: book.personalInsights,
        categoryId: category ? category.id : null,
      }
    });
  }
  console.log(`Created ${booksData.length} books.`);

  // --- Seed Garden Notes ---
  console.log('Seeding garden notes...');
  await prisma.gardenNote.deleteMany();

  const dualProcess = await prisma.gardenNote.create({
    data: {
      title: "Dual Process Theory",
      slug: "dual-process-theory",
      content: "Daniel Kahneman va Amos Tversky tomonidan taklif etilgan Dual Process Theory (ikki tomonlama jarayon nazariyasi) miyamiz qarorlarni ikkita alohida tizim orqali qabul qilishini tushuntiradi:\n\n1. **Tizim 1 (Tezkor fikrlash):** Intuitiv, hissiy, avtomatik va juda tez ishlaydi. Kam energiya sarflaydi, lekin kognitiv xatoliklar va og'ishlarga moyil.\n2. **Tizim 2 (Sekin fikrlash):** Diqqatni jamlashni talab qiladi, mantiqiy, hisob-kitobli va sekin. Ko'p energiya talab qiladi, shuning uchun miyamiz ko'pincha dangasalik qilib Tizim 1 ga tayanadi.\n\nMarketingda odamlarning birinchi navbatda Tizim 1 bilan qaror qilishini tushunish, ularga ta'sir o'tkazishni osonlashtiradi.",
      tags: "Behavioral Economics, Cognitive Psychology",
      status: "EVERGREEN"
    }
  });

  const nudgeTheory = await prisma.gardenNote.create({
    data: {
      title: "Nudge Theory",
      slug: "nudge-theory",
      content: "Richard Thaler va Cass Sunstein tomonidan ommalashtirilgan Nudge (turtki) nazariyasi tanlov arxitekturasi tushunchasiga tayanib, odamlarning erkinligini cheklamasdan yoki majburlamasdan, ularning qaror qabul qilish xatti-harakatlarini ijobiy tomonga yo'naltirish usulidir.\n\nBu kognitiv og'ishlarni tushunishga va inson uchun foydaliroq bo'lgan qarorni (masalan, jamg'arma qilish yoki sog'lom ovqatlanish) 'standart variant' (default option) sifatida taklif qilishga asoslanadi.",
      tags: "Behavioral Economics, Choice Architecture",
      status: "EVERGREEN"
    }
  });

  const brandPerception = await prisma.gardenNote.create({
    data: {
      title: "Brand Perception va Xotira",
      slug: "brand-perception-xotira",
      content: "Miyada brendlar qanday saqlanadi va eslanadi? Bizning xotiramiz va Tizim 1 uyushmalari (associations) brend idrokini shakllantiradi.\n\nIste'molchilar brend bilan bog'liq bo'lgan ranglar, tovushlar, his-tuyg'ular va tajribalarni xotira neyronlarida kodlashadi. Brend strategiyasining maqsadi — xotirada tez eslanuvchi (salient) va ijobiy neyron tarmoqlarini qurishdir. Bu bevosita Dual Process Theory (Tizim 1) bilan bog'liq.",
      tags: "Marketing, Consumer Psychology",
      status: "INCUBATOR"
    }
  });

  const politicalDecision = await prisma.gardenNote.create({
    data: {
      title: "Siyosiy Qaror Qabul Qilish",
      slug: "siyosiy-qaror-qabul-qilish",
      content: "Siyosatda saylovchilar qanday ovoz beradi? Ratsional tanlov nazariyasidan farqli o'laroq, saylovchilar qarorlari ko'pincha kognitiv og'ishlar, ijtimoiy normalar va guruh identifikatsiyasi ta'sirida bo'ladi.\n\nNudge nazariyasi va tanlov arxitekturasi siyosatchilar tomonidan kampaniyalarni loyihalashda va jamiyat xatti-harakatlarini boshqarishda keng qo'llaniladi.",
      tags: "Political Science, Behavioral Economics",
      status: "SEEDLING"
    }
  });

  // Connect them
  await prisma.gardenNote.update({
    where: { id: dualProcess.id },
    data: {
      linkedNodes: {
        connect: [{ id: nudgeTheory.id }, { id: brandPerception.id }]
      }
    }
  });

  await prisma.gardenNote.update({
    where: { id: nudgeTheory.id },
    data: {
      linkedNodes: {
        connect: [{ id: politicalDecision.id }]
      }
    }
  });

  await prisma.gardenNote.update({
    where: { id: brandPerception.id },
    data: {
      linkedNodes: {
        connect: [{ id: dualProcess.id }]
      }
    }
  });

  await prisma.gardenNote.update({
    where: { id: politicalDecision.id },
    data: {
      linkedNodes: {
        connect: [{ id: dualProcess.id }, { id: nudgeTheory.id }]
      }
    }
  });

  console.log('Created garden notes.');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

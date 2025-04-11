// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Получаем ID созданных пользователей
  const userRecords = await prisma.user.findMany();
  const usersMap = userRecords.reduce((acc, user) => {
    acc[`${user.firstName} ${user.lastName}`] = user.id;
    return acc;
  }, {} as Record<string, number>);

  // Данные мест
  const placesData = [
    {
      name: 'On The Wave',
      rating: 4.5,
      category: 'Wake Surfing',
      address: 'Dubai, Marina - Business Bay',
      keywords: 'Wakesurf Longboard Wakefoil',
      website: 'https://onthewaveproject.com',
      instagram: 'https://www.instagram.com/onthewave_project?igsh=anpsajZ6bjV2dDd4',
      googleMaps: 'https://g.co/kgs/x38nFMJ',
      phoneNumber: '+971545977741',
      workingHours: '10:00-20:00',
      description: 'Why choose our Wake Surfing spots in Creek? Just 10-30 minutes from anywhere in Dubai, enjoy smooth waves with no boats around, perfect for progress even in wind, plus stunning Burj Khalifa views at sunrise and sunset. Your experience matters to us!',
      reviews: [
        { text: 'Great day on the water, instructors are amazing! Highly recommend.', userName: 'Musa Dlamini', rating: 5 },
        { text: 'Wakesurfing is love at first try, I’ll be back!', userName: 'Mei Ying', rating: 4 },
      ],
    },
    {
      name: 'Bodify',
      rating: 4.7,
      category: 'Ladies Fitness Club',
      address: 'Dubai, Business Central Towers, G floor',
      keywords: 'Aero • Stretching • Pilates • Workout',
      website: 'https://bodifystudio.com/subscription_smm?utm_source=smm_taplink&fbclid=PAZXh0bgNhZW0CMTEAAaY79f641sZxB9JZ98fFgntUeKa7CnkTJD2HK4KQaD5jKbjGs-gbQkEIWMY_aem_QOQMLzR6Bd_QV-MygQc8rg',
      instagram: 'https://www.instagram.com/bodify.dubai?igsh=MTVvYnVnbHlob285YQ==',
      googleMaps: 'https://g.co/kgs/EdMfCh8',
      phoneNumber: '+971 50 994 2660',
      workingHours: '7:00 -23:00, 8:00-22:00',
      description: 'Our studio offers not just workouts but opportunities for personal growth. Regular sessions will help you enhance your abilities, learn new skills, and unlock your potential. You\'ll become stronger not only physically but also internally.',
      reviews: [
        { text: 'Workouts are awesome, the vibe keeps you motivated!', userName: 'Chloe Matthews', rating: 5 },
        { text: 'Love this place, the trainers really know their stuff.', userName: 'Mei Ying', rating: 4 },
      ],
    },
    // Добавьте остальные места по аналогии
    {
      name: 'Krasota',
      rating: 5,
      category: 'Michelin restaurant',
      address: 'Dubai, Downtown hotel, ground floor',
      keywords: 'Michelin star. High cuisine . Omotenashi . Show',
      website: 'https://krasota.art/en',
      instagram: 'https://www.instagram.com/krasota.restaurant.dubai?igsh=MXczY25rYTJ2MXZleQ==',
      googleMaps: 'https://maps.app.goo.gl/rDCJrmHAGbG1FGNu5',
      phoneNumber: '97144331258',
      workingHours: '13:00-00:00',
      description: 'Krasota Dubai is a unique fine dining destination that merges haute cuisine and visual art. Each dinner is a performance with a tasting menu created by starred chef Vladimir Mukhin, accompanied by stunning visual effects',
      reviews: [
        { text: 'The food is art, every bite is delightful!', userName: 'Rohan Verma', rating: 5 },
        { text: 'Incredible experience, perfect for a special night.', userName: 'Musa Dlamini', rating: 5 },
      ],
    },
    {
      name: 'Trinity Cars Rental Boutique',
      rating: 5,
      category: 'Luxury Car Rental',
      address: 'Dubai ,44, 6A Street, Al Quoz 3, Dubai',
      keywords: 'Luxury cars, supercar rental, premium service, Dubai driving',
      website: 'https://trinityrental.com/',
      instagram: 'https://www.instagram.com/trinity_rental?igsh=MWFpd2V1dmtmdHEydQ==',
      googleMaps: 'https://g.co/kgs/gk49vJp',
      phoneNumber: '+971564877870',
      workingHours: '09:00–21:00',
      description: 'Trinity Cars Rental Boutique in Dubai is an elite luxury car rental service offering over 80 2024 models, including Lamborghini, Ferrari and Rolls-Royce. With no deposit, free shipping and a full tank of fuel, this is the perfect choice for an unforgettable driving experience on the streets of the UAE.',
      reviews: [
        { text: 'Drove a Lamborghini — a dream come true!', userName: 'Rohan Verma', rating: 5 },
        { text: 'Top-notch service, the car was flawless.', userName: 'Chloe Matthews', rating: 5 },
      ],
    },
    {
      name: 'Louvre Abu Dhabi',
      rating: 5,
      category: 'Art Museum',
      address: 'Abu Dhabi,Saadiyat Cultural District, Saadiyat Island',
      keywords: 'Universal museum, cultural heritage, iconic dome, art exhibitions',
      website: 'https://www.louvreabudhabi.ae/',
      instagram: 'https://www.instagram.com/louvreabudhabi/',
      googleMaps: 'https://g.co/kgs/rSbiQ1W',
      phoneNumber: '+971 600 565566',
      workingHours: '10:00–18:30 (вт–чт), 10:00–20:30 (пт–вс), закрыто в пн',
      description: 'Louvre Abu Dhabi is the first universal museum in the Arab world, combining art from different cultures and eras under the stunning dome of Jean Nouvel. From ancient artifacts to modern masterpieces, it offers a unique journey through human history with an emphasis on cross-cultural connections.',
      reviews: [
        { text: 'The exhibition inspires, time flew by unnoticed.', userName: 'Mei Ying', rating: 5 },
        { text: 'Cool spot for art lovers!', userName: 'Musa Dlamini', rating: 4 },
      ],
    },
    {
      name: 'Ferrari World Abu Dhabi',
      rating: 5,
      category: 'Theme Park',
      address: 'Abu Dhabi, Yas Island',
      keywords: 'Fastest rollercoaster, Ferrari thrills, family adventure, Yas Island',
      website: 'https://www.ferrariworldabudhabi.com/',
      instagram: 'https://www.instagram.com/ferrariworldyasisland?igsh=MXg1NjZmeW90ejQ0eQ==',
      googleMaps: 'https://g.co/kgs/ffJ5ztQ',
      phoneNumber: '+971 50 496 8000',
      workingHours: '12:00–20:00 (вт–сб)',
      description: 'Ferrari World Abu Dhabi on Yas Island is the world\'s first Ferrari theme park and home to the world\'s fastest Formula Rossa roller coaster. Over 40 rides, Italian cuisine and thrilling shows under the iconic red dome promise adrenaline and fun for the whole family',
      reviews: [
        { text: 'Rides are pure adrenaline, I’m obsessed!', userName: 'Rohan Verma', rating: 5 },
        { text: 'Fun for friends and family alike.', userName: 'Chloe Matthews', rating: 5 },
      ],
    },
    {
      name: 'Vogue Haven',
      rating: 5,
      category: 'Fashion Clothing Store',
      address: 'Dubai, Jumeirah Beach Road, Umm Suqeim 2',
      keywords: 'Trendy fashion, luxury streetwear, Dubai style, exclusive designs',
      website: 'https://www.voguehaven.ae/',
      instagram: 'https://www.instagram.com/voguehaven.dubai/',
      googleMaps: 'https://maps.app.goo.gl/XxXxXxXxXxXxXxXxX',
      phoneNumber: '+971 4 321 5678',
      workingHours: '10:00–22:00 (ежедневно)',
      description: 'Vogue Haven — is a fashion boutique in the heart of Dubai, offering an exclusive collection of trendy clothing and accessories. From luxury streetwear to elegant evening looks, the store combines style and comfort for those who set the fashion in the UAE.',
      reviews: [
        { text: 'Stylish stuff, revamped my wardrobe 100%!', userName: 'Mei Ying', rating: 5 },
        { text: 'Great selection, staff helped me pick an outfit.', userName: 'Musa Dlamini', rating: 4 },
      ],
    },
    {
      name: 'M3',
      rating: 4.9,
      category: 'Barbershop',
      address: 'Dubai, M3 Barbershop City Walk',
      keywords: 'Haircut Beard Dyeing Perm',
      website: 't.me/m3barbershop_dubai',
      instagram: 'https://www.instagram.com/m3barbershop_dubai?igsh=MWw2NXFidDZhNGE0Ng==',
      googleMaps: 'https://maps.app.goo.gl/mrJgkLEKNX5f4xHs5',
      phoneNumber: '+971506759645',
      workingHours: '10:00-22:00, 9:00-23:00',
      description: 'M3 Barbershop in City Walk, Dubai is a stylish space where craftsmanship meets comfort. Premium haircuts, beard care, and a relaxing atmosphere with PlayStation and drinks are all for the modern man.',
      reviews: [
        { text: 'Perfect haircut, the barbers are pros!', userName: 'Rohan Verma', rating: 5 },
        { text: 'Awesome vibe, this is my go-to now.', userName: 'Musa Dlamini', rating: 4 },
      ],
    },
    {
      name: 'Etihad Museum',
      rating: 5,
      category: 'History Museum',
      address: 'Dubai, Jumeirah 1, Al Mina Street',
      keywords: 'UAE history, Union House, cultural heritage, interactive exhibits',
      website: 'https://etihadmuseum.dubaiculture.gov.ae/',
      instagram: 'https://www.instagram.com/etihadmuseum/',
      googleMaps: 'https://maps.app.goo.gl/rXyG7WjY8sK8L9pPA',
      phoneNumber: '+971 4 515 5771',
      workingHours: '10:00–20:00 (ежедневно)',
      description: 'Etihad Museum is a dynamic cultural landmark in Dubai that brings to life the history of the UAE’s formation in 1971. Located at the site of the Union House, it offers interactive exhibits, historic artifacts, and educational programs exploring the nation’s journey, blending tradition with modern design.',
      reviews: [
        { text: 'Learned so much, the exhibits are impressive.', userName: 'Chloe Matthews', rating: 5 },
        { text: 'Interesting and educational, recommend to all!', userName: 'Mei Ying', rating: 5 },
      ],
    },
    {
      name: 'Bliss Retreat Spa',
      rating: 5,
      category: 'Spa and Wellness Center',
      address: 'Dubai, Business Bay, Al Abraj Street, Tower B',
      keywords: 'Urban wellness, luxury spa, stress relief, modern relaxation',
      website: 'https://www.blissretreatspa.com/',
      instagram: 'https://www.instagram.com/blissretreatspa/',
      googleMaps: 'https://maps.app.goo.gl/BbBbBbBbBbBbBbBbB',
      phoneNumber: '+971 4 987 6543',
      workingHours: '10:00–22:00 (ежедневно)',
      description: 'Bliss Retreat Spa in Business Bay is a modern sanctuary offering a fusion of luxurious spa treatments and urban relaxation. Nestled in Dubai’s bustling business district, it provides rejuvenating massages, facials, and serene escapes tailored for busy professionals and students alike',
      reviews: [
        { text: 'Relaxed 100%, the massage was magical!', userName: 'Chloe Matthews', rating: 5 },
        { text: 'Peace and comfort, perfect getaway.', userName: 'Rohan Verma', rating: 5 },
      ],
    },
    {
      name: 'Pearl Smile Dental Clinic',
      rating: 5,
      category: 'Dental Clinic',
      address: 'Dubai, Al Barsha 1, Sheikh Zayed Road, Al Barsha Mall',
      keywords: 'Dental care, cosmetic dentistry, healthy smile, advanced technology',
      website: 'https://www.pearlsmiledental.com/',
      instagram: 'https://www.instagram.com/pearlsmiledental/',
      googleMaps: 'https://maps.app.goo.gl/DdDdDdDdDdDdDdDdD',
      phoneNumber: '+971 4 321 9876',
      workingHours: '09:00–20:00 (ежедневно)',
      description: 'Pearl Smile Dental Clinic in Al Barsha is a state-of-the-art dental practice offering top-tier care in Dubai. From routine check-ups to advanced cosmetic procedures like teeth whitening and veneers, it combines cutting-edge technology with a welcoming atmosphere for perfect smiles.',
      reviews: [
        { text: 'Teeth like pearls, doctors are great!', userName: 'Musa Dlamini', rating: 5 },
        { text: 'Quick and painless, smiling wider now.', userName: 'Mei Ying', rating: 5 },
      ],
    },
  ];

  // Создаем места и отзывы
  for (const placeData of placesData) {
    const place = await prisma.place.create({
      data: {
        name: placeData.name,
        rating: placeData.rating,
        category: placeData.category,
        address: placeData.address,
        keywords: placeData.keywords,
        website: placeData.website,
        instagram: placeData.instagram,
        phoneNumber: placeData.phoneNumber,
        workingHours: placeData.workingHours,
        description: placeData.description,
      },
    });

    // Создаем отзывы для этого места
    for (const reviewData of placeData.reviews) {
      await prisma.review.create({
        data: {
          placeId: place.id,
          userId: usersMap[reviewData.userName],
          text: reviewData.text,
          rating: reviewData.rating,
        },
      });
    }

    // Обновляем рейтинг места на основе отзывов
    const avgRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        placeId: place.id,
      },
    });

    await prisma.place.update({
      where: { id: place.id },
      data: { rating: avgRating._avg.rating || place.rating },
    });

    console.log(`Создано место: ${place.name} с ${placeData.reviews.length} отзывами`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

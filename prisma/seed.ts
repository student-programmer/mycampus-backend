import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.place.createMany({
    data: [
      {
        name: 'Place 1',
        rating: 4.5,
        category: 'Restaurant',
        address: '123 Main St, City, Country',
        keywords: 'restaurant, food, dine',
        website: 'https://place1.com',
        instagram: 'https://instagram.com/place1',
        phoneNumber: '123-456-7890',
        workingHours: 'Mon-Sun 9:00 AM - 10:00 PM',
        description: 'A great place for dining with friends.',
      },
      {
        name: 'Place 2',
        rating: 3.9,
        category: 'Cafe',
        address: '456 Park Ave, City, Country',
        keywords: 'coffee, cafe, hangout',
        website: 'https://place2.com',
        instagram: 'https://instagram.com/place2',
        phoneNumber: '987-654-3210',
        workingHours: 'Mon-Sun 8:00 AM - 8:00 PM',
        description: 'A cozy place for coffee lovers.',
      },
      {
        name: 'Place 3',
        rating: 4.0,
        category: 'Bar',
        address: '789 River Rd, City, Country',
        keywords: 'bar, drinks, night',
        website: 'https://place3.com',
        instagram: 'https://instagram.com/place3',
        phoneNumber: '321-654-9870',
        workingHours: 'Mon-Sun 5:00 PM - 2:00 AM',
        description: 'Enjoy drinks with a great view.',
      },
      {
        name: 'Place 4',
        rating: 4.7,
        category: 'Gym',
        address: '101 Fitness Blvd, City, Country',
        keywords: 'gym, fitness, workout',
        website: 'https://place4.com',
        instagram: 'https://instagram.com/place4',
        phoneNumber: '555-123-4567',
        workingHours: 'Mon-Sun 6:00 AM - 10:00 PM',
        description: 'A place to build your strength and endurance.',
      },
      {
        name: 'Place 5',
        rating: 4.2,
        category: 'Cinema',
        address: '202 Movie St, City, Country',
        keywords: 'cinema, movies, entertainment',
        website: 'https://place5.com',
        instagram: 'https://instagram.com/place5',
        phoneNumber: '777-555-1234',
        workingHours: 'Mon-Sun 11:00 AM - 12:00 AM',
        description: 'Watch the latest movies in a comfortable theater.',
      },
      {
        name: 'Place 6',
        rating: 3.8,
        category: 'Library',
        address: '303 Reading Rd, City, Country',
        keywords: 'library, books, study',
        website: 'https://place6.com',
        instagram: 'https://instagram.com/place6',
        phoneNumber: '111-222-3333',
        workingHours: 'Mon-Sun 9:00 AM - 7:00 PM',
        description: 'A quiet place to read and study.',
      },
    ],
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

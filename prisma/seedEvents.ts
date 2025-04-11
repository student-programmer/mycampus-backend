// seed-events.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Данные мероприятий
  const eventsData = [
    {
      name: 'Beyoncé: Dubai Nights Concert',
      category: 'Live Music Concert',
      address: 'Dubai, Burj Al Arab Amphitheatre, Jumeirah Beach Road',
      price: 350,
      website: 'https://www.beyonceindubai.com/',
      instagram: 'https://www.instagram.com/beyonceindubai/',
      phoneNumber: '+971 4 567 8901',
      description: 'Join global superstar Beyoncé for an unforgettable night of music under the stars at the iconic Burj Al Arab Amphitheatre. Expect electrifying performances, stunning visuals, and hits from her latest album, all set against Dubai\'s luxurious backdrop.',
      schedules: [
        { time: '2025-04-25T20:00:00' },
      ],
    },
    {
      name: 'Formula 1 Abu Dhabi Grand Prix 2025',
      category: 'Motorsport Race',
      address: 'Abu Dhabi, Yas Marina Circuit, Yas Island',
      price: 500,
      website: 'https://www.abudhabif1grandprix.com/',
      instagram: 'https://www.instagram.com/abudhabif1gp/',
      phoneNumber: '+971 2 659 9800',
      description: 'Experience the thrilling season finale of the Formula 1 Abu Dhabi Grand Prix 2025 at Yas Marina Circuit. Watch the world\'s top drivers compete under the dazzling twilight sky, with high-speed action, stunning views, and exclusive fan events.',
      schedules: [
        { time: '2025-12-05T15:00:00' },
        { time: '2025-12-06T15:00:00' },
        { time: '2025-12-07T15:00:00' },
      ],
    },
    {
      name: 'Emirati Heritage Night',
      category: 'Cultural Workshop & Experience',
      address: 'Dubai, Al Fahidi Historical Neighbourhood, Bur Dubai',
      price: 75,
      website: 'https://www.emiratiheritagenight.com/',
      instagram: 'https://www.instagram.com/emiratiheritagenight/',
      phoneNumber: '+971 4 321 4567',
      description: 'Dive into Emirati culture at Emirati Heritage Night in Al Fahidi. Enjoy traditional food, live oud music, henna art, and a guided tour through Dubai\'s historic district to learn about local customs and history.',
      schedules: [
        { time: '2025-05-10T18:00:00' },
      ],
    },
    {
      name: 'Dubai Student Hackathon 2025',
      category: 'Technology Hackathon',
      address: 'Dubai, Dubai Silicon Oasis, DTEC (Dubai Technology Entrepreneur Campus), Building A2',
      price: 0,
      website: 'https://www.dubaistudenthackathon.com/',
      instagram: 'https://www.instagram.com/dubaistudenthackathon/',
      phoneNumber: '+971 4 501 5432',
      description: 'Join the Dubai Student Hackathon 2025 at DTEC for 48 hours of coding, creativity, and collaboration. Build innovative tech solutions, compete for prizes, and network with industry mentors—all tailored for students passionate about IT.',
      schedules: [
        { time: '2025-06-14T09:00:00' },
        { time: '2025-06-15T09:00:00' },
      ],
    },
    {
      name: 'Student Career Day 2025',
      category: 'Career Fair & Networking Event',
      address: 'Dubai, Dubai International Financial Centre (DIFC), Gate Village, Building 4',
      price: 25,
      website: 'https://www.studentcareerdaydubai.com/',
      instagram: 'https://www.instagram.com/studentcareerdaydubai/',
      phoneNumber: '+971 4 654 3210',
      description: 'Kickstart your future at Student Career Day 2025 in DIFC! Meet top employers from IT, finance, and more, attend resume workshops, and explore internship opportunities tailored for students in Dubai.',
      schedules: [
        { time: '2025-07-20T10:00:00' },
      ],
    },
    {
      name: 'Rhythm & Moves Dance Master Class',
      category: 'Dance Workshop',
      address: 'Dubai, Jumeirah Beach Residence (JBR), The Walk, Studio 5',
      price: 120,
      website: 'https://www.rhythmmovesdubai.com/',
      instagram: 'https://www.instagram.com/rhythmmovesdubai/',
      phoneNumber: '+971 4 876 5432',
      description: 'Get your groove on at the Rhythm & Moves Dance Master Class in JBR! Learn hip-hop and contemporary moves from top choreographers, perfect for students looking to unwind and shine on the dance floor.',
      schedules: [
        { time: '2025-09-12T17:00:00' },
      ],
    },
    {
      name: 'Run Dubai 2025',
      category: 'Running Race',
      address: 'Dubai, Burj Al Arab to Palm Jumeirah, Coastal Path',
      price: 50,
      website: 'https://www.rundubai2025.com/',
      instagram: 'https://www.instagram.com/rundubai2025/',
      phoneNumber: '+971 4 987 6543',
      description: 'Lace up for Run Dubai 2025! Join students and runners on a scenic 5K from Burj Al Arab to Palm Jumeirah, with stunning views and a vibrant community vibe—perfect for fitness and fun.',
      schedules: [
        { time: '2025-10-18T06:00:00' },
      ],
    },
    {
      name: 'GITEX Future Tech 2025',
      category: 'Technology Exhibition & Conference',
      address: 'Dubai, Dubai World Trade Centre, Sheikh Zayed Road',
      price: 100,
      website: 'https://www.gitexfuturetech2025.com/',
      instagram: 'https://www.instagram.com/gitexfuturetech/',
      phoneNumber: '+971 4 321 0000',
      description: 'Explore the future at GITEX Future Tech 2025! Discover cutting-edge innovations, attend tech talks, and network with industry leaders at Dubai World Trade Centre—perfect for students passionate about IT and startups.',
      schedules: [
        { time: '2025-11-10T10:00:00' },
        { time: '2025-11-11T10:00:00' },
        { time: '2025-11-12T10:00:00' },
        { time: '2025-11-13T10:00:00' },
        { time: '2025-11-14T10:00:00' },
      ],
    },
    {
      name: 'Dubai Student Football Showdown 2025',
      category: 'Sports Event',
      address: 'Dubai, Al Wasl Sports Club, Oud Metha Road',
      price: 30,
      website: 'https://www.dubaistudentfootball.com/',
      instagram: 'https://www.instagram.com/dubaistudentfootball/',
      phoneNumber: '+971 4 567 8901',
      description: 'Cheer on your peers at the Dubai Student Football Showdown 2025! Watch top student teams compete at Al Wasl Sports Club, enjoy food stalls, and join the fun—perfect for a lively day out.',
      schedules: [
        { time: '2025-12-20T16:00:00' },
      ],
    },
  ];

  // Создаем мероприятия и их расписания
  for (const eventData of eventsData) {
    const event = await prisma.event.create({
      data: {
        name: eventData.name,
        category: eventData.category,
        address: eventData.address,
        price: eventData.price,
        website: eventData.website,
        instagram: eventData.instagram,
        phoneNumber: eventData.phoneNumber,
        description: eventData.description,
      },
    });

    // Создаем расписания для этого мероприятия
    for (const scheduleData of eventData.schedules) {
      await prisma.eventSchedule.create({
        data: {
          eventId: event.id,
          time: new Date(scheduleData.time),
        },
      });
    }

    console.log(`Создано мероприятие: ${event.name} с ${eventData.schedules.length} сеансами`);
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

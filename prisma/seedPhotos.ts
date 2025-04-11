// update-photos-specific.ts
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// Специфичные фото для мест (можно заменить на реальные URL)
const PLACE_PHOTOS: Record<string, string[]> = {
    'On The Wave': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9175.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9176.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9181.PNG',
    ],
    'Bodify': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9188.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9185.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9183.PNG',
    ],
    'Krasota': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9191.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9194.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9195.PNG',
    ],
    'Trinity Cars Rental Boutique': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9210.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9218.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9208.PNG',
    ],
    'Louvre Abu Dhabi': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9211.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9214.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9215.PNG',
    ],
    'Ferrari World Abu Dhabi': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9229.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9228.JPG',
    ],
    'Vogue Haven': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9232.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9230.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9231.JPG',
    ],
    'M3': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9207.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9201.PNG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9206.JPG',
    ],
    'Etihad Museum': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9237.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9235.JPG',
    ],
    'Bliss Retreat Spa': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9238.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9240.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9239.JPG',
    ],
    'Pearl Smile Dental Clinic': [
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9242.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9243.JPG',
        'https://s3.twcstorage.ru/411e7691-myc/places/IMG_9244.JPG',

    ],
};

// Специфичные фото для событий
const EVENT_PHOTOS: Record<string, string[]> = {
    'Rhythm & Moves Dance Master Class': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9265.JPG',
    ],
    'Run Dubai 2025': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9266.JPG'
    ],
    'GITEX Future Tech 2025': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9267.JPG'
    ],
    'Dubai Student Football Showdown 2025': [
    ],
    'Beyoncé: Dubai Nights Concert': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9262.JPG'
    ],
    'Formula 1 Abu Dhabi Grand Prix 2025': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9260.JPG'
    ],
    'Emirati Heritage Night': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9263.JPG'
    ],
    'Dubai Student Hackathon 2025': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_5052.JPEG'
    ],
    'Student Career Day 2025': [
        'https://s3.twcstorage.ru/411e7691-myc/events/IMG_9264.JPG'
    ],
};

// Фото по умолчанию, если для места/события нет специфичных фото
const DEFAULT_PHOTOS = {
    place: [
        'https://example.com/default/place1.jpg',
        'https://example.com/default/place2.jpg'
    ],
    event: [
        'https://example.com/default/event1.jpg',
        'https://example.com/default/event2.jpg'
    ]
};

async function updatePlacesWithSpecificPhotos() {
    const places = await prisma.place.findMany();

    for (const place of places) {
        const photos = PLACE_PHOTOS[place.name] || DEFAULT_PHOTOS.place;

        await prisma.place.update({
            where: {id: place.id},
            data: {photos},
        });

        console.log(`Обновлено место "${place.name}" с ${photos.length} фото`);
    }
}

async function updateEventsWithSpecificPhotos() {
    const events = await prisma.event.findMany();

    for (const event of events) {
        const photos = EVENT_PHOTOS[event.name] || DEFAULT_PHOTOS.event;

        await prisma.event.update({
            where: {id: event.id},
            data: {photos},
        });

        console.log(`Обновлено событие "${event.name}" с ${photos.length} фото`);
    }
}

async function main() {
    console.log('Начало обновления мест со специфичными фото...');
    await updatePlacesWithSpecificPhotos();

    console.log('\nНачало обновления событий со специфичными фото...');
    await updateEventsWithSpecificPhotos();

    console.log('\nОбновление завершено!');
}

main()
    .catch((e) => {
        console.error('Ошибка при обновлении:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ConnectsModule } from './connects/connects.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PlacesModule } from './places/places.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [CommonModule, UserModule, PlacesModule, ConnectsModule],
    controllers: [EventsController],
    providers: [EventsService],
})
export class ApplicationModule {}

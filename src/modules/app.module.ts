import {Module} from '@nestjs/common';

import { ChatModule } from './chat/chat.module';
import {CommonModule} from './common';
import {ConnectsModule} from './connects/connects.module';
// import {DictController} from './dict/controller';
import {DictModule} from './dict/dict.module';
// import {DictService} from './dict/service';
import {EventsController} from './events/events.controller';
// import {EventsModule} from './events/events.module';
import {EventsService} from './events/events.service';
import {PlacesModule} from './places/model/places.module';
import {UserModule} from './user/user.module';

@Module({
    imports: [CommonModule, UserModule, PlacesModule, ConnectsModule, DictModule, ChatModule],
    controllers: [EventsController],
    providers: [EventsService],
})
export class ApplicationModule {
}

import {Module} from '@nestjs/common';

import {CommonModule} from './common';
import {ConnectsModule} from './connects/connects.module';
// import {DictController} from './dict/controller';
import {DictModule} from './dict/dict.module';
// import {DictService} from './dict/service';
import {EventsController} from './events/events.controller';
// import {EventsModule} from './events/events.module';
import {EventsService} from './events/events.service';
import {PlacesModule} from './places/places.module';
import {UserModule} from './user/user.module';
import { ChatModule } from "./chat/chat.module";

@Module({
    imports: [CommonModule, UserModule, PlacesModule, ConnectsModule, DictModule, ChatModule],
    controllers: [EventsController],
    providers: [EventsService],
})
export class ApplicationModule {
}

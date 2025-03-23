import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import {DictController} from './controller';
import {DictService} from './service';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        DictService,
    ],
    controllers: [
        DictController,
    ],
    exports: []
})
export class DictModule { }

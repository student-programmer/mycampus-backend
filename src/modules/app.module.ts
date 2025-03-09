import { Module } from "@nestjs/common";

import { CommonModule } from "./common";
import { UserModule } from "./user/user.module";
import { PlacesModule } from "./places/places.module";

@Module({
    imports: [CommonModule, UserModule, PlacesModule],
})
export class ApplicationModule {}

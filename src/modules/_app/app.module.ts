import { CoreModule } from '@core/core.module';
import { TestServicesModule } from '@modules/test-services';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        CoreModule,
        TestServicesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

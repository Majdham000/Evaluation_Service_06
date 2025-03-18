import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromptService } from './controllers/prompt.controller';
import { OpenAiService } from './services/openai.service';
import { PromptModule } from './modules/prompt.module';

@Module({
  imports: [PromptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

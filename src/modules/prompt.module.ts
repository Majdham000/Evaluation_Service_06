import { Module } from '@nestjs/common';
import { PromptService } from '../controllers/prompt.controller';
import { OpenAiService } from '../services/openai.service';

@Module({
    imports: [],
    controllers: [PromptService],
    providers: [OpenAiService],
})
export class PromptModule {}

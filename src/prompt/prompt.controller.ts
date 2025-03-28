import { GrpcMethod } from '@nestjs/microservices';
import { PromptService } from './prompt.service';
import { Controller} from '@nestjs/common';

@Controller()
export class PromptController {
    constructor(private readonly promptService: PromptService) {}

    @GrpcMethod('OpenAiService', 'GeneratePrompt')
    async generatePrompt(data: { company_data: string; messages_history: string; ideal_answer: string; ai_agent_answer: string }): Promise<{ score: number; reason: string }> {
        const result = await this.promptService.generateText(data.company_data, data.messages_history, data.ideal_answer, data.ai_agent_answer);       
        
        return {score: result.score, reason: result.reason};
    }
}

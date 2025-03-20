import { GrpcMethod } from '@nestjs/microservices';
import { OpenAiService } from '../services/openai.service';
import { Controller} from '@nestjs/common';
import { json } from 'node:stream/consumers';

@Controller()
export class PromptService {
    constructor(private readonly openAIService: OpenAiService) {}

    @GrpcMethod('PromptService', 'GeneratePrompt')
    async generatePrompt(data: { company_data: string; messages_history: string; ideal_answer: string; ai_agent_answer: string }): Promise<{ score: number; reason: string }> {
        const result = await this.openAIService.generateText(data.company_data, data.messages_history, data.ideal_answer, data.ai_agent_answer);
        const result_json = JSON.parse(result)
        
        return { score: result_json.score, reason: result_json.reason };
    }
}

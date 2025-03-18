import { GrpcMethod } from '@nestjs/microservices';
import { OpenAiService } from '../services/openai.service';
import { Controller} from '@nestjs/common';

@Controller()
export class PromptService {
    constructor(private readonly openAIService: OpenAiService) {}

    @GrpcMethod('PromptService', 'GeneratePrompt')
    async generatePrompt(data: { company_data: string; messages_history: string; ideal_answer: string; ai_agent_answer: string }): Promise<{ prompt: string }> {
        // const firstKey = Object.keys(data)[0];
        // const firstValue = data[firstKey];

        // console.log('Received gRPC request:', firstValue);
        // console.log('Received gRPC request:', firstKey);
        // console.log(typeof(firstValue));

        const prompt = await this.openAIService.generateText(data[Object.keys(data)[0]], data[Object.keys(data)[1]], data[Object.keys(data)[2]], data[Object.keys(data)[3]]);
        return { prompt };
    }
}

import { GrpcMethod } from '@nestjs/microservices';
import { OpenAiService } from '../services/openai.service';
import { Controller} from '@nestjs/common';
import { json } from 'node:stream/consumers';

@Controller()
export class PromptService {
    constructor(private readonly openAIService: OpenAiService) {}

    @GrpcMethod('PromptService', 'GeneratePrompt')
    async generatePrompt(data: { company_data: string; messages_history: string; ideal_answer: string; ai_agent_answer: string }): Promise<{ score: number; reason: string }> {
        // const firstKey = Object.keys(data)[0];
        // const firstValue = data[firstKey];

        // console.log('Received gRPC request:', firstValue);
        // console.log('Received gRPC request:', firstKey);
        // console.log(typeof(firstValue));

        const result = await this.openAIService.generateText(data[Object.keys(data)[0]], data[Object.keys(data)[1]], data[Object.keys(data)[2]], data[Object.keys(data)[3]]);
        const result_json = JSON.parse(result)
        //console.log(result_json);
        

        return { score: result_json.score, reason: result_json.reason };
    }
}

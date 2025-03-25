import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from "@langchain/openai";


@Injectable()
export class PromptService {
    private chatModel: ChatOpenAI;
    private structuredChatModel: ReturnType<ChatOpenAI['withStructuredOutput']>;
    private schema: object;

    constructor() {
        this.chatModel = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY, 
            modelName: "gpt-4o-mini",  
            temperature: 0
        });

        this.schema = {
            type: "object",
            properties: {
                score: { type: "number", minimum: 0, maximum: 100 },
                reason: { type: "string", maxLength: 35 }
            },
            required: ["score", "reason"]
        };

        this.structuredChatModel = this.chatModel.withStructuredOutput(this.schema);
    }

    async generateText(company_data: string, messages_history: string, ideal_answer: string, ai_agent_answer: string): Promise<object> {
        const delimiter = '"""';
        const prompt =  
`You are an assistant that evaluates how well the customer service agent answers a user question by comparing the response to the ideal (expert) response. 
Output a JSON object with keys (score and reason) of evaluating.

You are comparing a submitted answer to an expert answer on a given question. Here is the data:
[BEGIN DATA]
************
[Company Data]: 
${delimiter}${company_data}${delimiter}
************
[Message History]: 
${delimiter}${messages_history}${delimiter}
************
[Ideal Answer]: 
${delimiter}${ideal_answer}${delimiter}
************
[AI Agent Output]: 
${delimiter}${ai_agent_answer}${delimiter}
************
[END DATA]

### Evaluation Standards:
- **Accuracy**: 20% [Score out of 10]
- **Completeness**: 15% [Score out of 10]
- **Relevance**: 10% [Score out of 10]
- **Coherence**: 10% [Score out of 10]
- **Contextual Awareness**: 10% [Score out of 10]
- **Engagement**: 5% [Score out of 10]
- **Compliance**: 15% [Score out of 10]
- **Consistency**: 10% [Score out of 10]
- **Detail Equivalence**: 5% [Score out of 10]

### Final Score:
Compute it according to the standards [Score out of 100]

### Output Format:
{
    "score" : final score (0-100) according to achieved standards,
    "reason" : explanation of this score (at most 30 words)
}`;

        const response = await this.structuredChatModel.invoke([
            { role: 'system', content: prompt }
        ]);

        return response;
    }
}

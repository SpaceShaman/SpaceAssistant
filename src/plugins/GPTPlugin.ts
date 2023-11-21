import { SettingsStore } from '@/stores/settings';
import generateText from '@/utils/generateText';
import textToSpeach from '@/utils/textToSpeach';
import type { CommandOption } from 'annyang';
import OpenAI from 'openai';

export default class {
    settings = SettingsStore();
    output: string = '';
    openai = new OpenAI({ apiKey: this.settings.openaiApiKey, dangerouslyAllowBrowser: true })

    askGPT = async (question: string) => {
        const openai = new OpenAI({ apiKey: this.settings.openaiApiKey, dangerouslyAllowBrowser: true })
    
        this.output = await generateText(question, openai, this.settings.model);
        await textToSpeach(this.output, openai, this.settings.voice);
    }

    commands: CommandOption = {
        'powiedz mi *tag': this.askGPT as any,
    }
}

import OpenAI from 'openai';
import { SettingsStore } from '../stores/settings';
import generateText from '../utils/generateText';
import textToSpeach from '../utils/textToSpeach';
import type Plugin from './pluginType';


const askGPT = async (question: string) => {
    const settings = SettingsStore()
    const openai = new OpenAI({ apiKey: settings.openaiApiKey, dangerouslyAllowBrowser: true })

    GPTPlugin.output = await generateText(question, openai, settings.model);
    await textToSpeach(GPTPlugin.output, openai, settings.voice);
}


const GPTPlugin: Plugin = {
    output: '',
    commands: {
        'tell me *tag': askGPT as any,
    }
}


export default GPTPlugin;
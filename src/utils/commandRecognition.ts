// @ts-ignore
import { CommandsLanguages } from '@/stores/settings';
import Artyom from 'artyom.js';

const artyom = new Artyom()

interface Command {
    indexes: string[];
    action: () => void;
}

export default (comands: Command[], lang: CommandsLanguages = CommandsLanguages.englishUS) => {
    artyom.fatality()
    artyom.addCommands(comands)
    artyom.initialize({
        lang: lang,
        continuous: true,
        listen: true,
        debug: false,
        speed: 1,
        mode: 'quick'
    })
}
// @ts-ignore
import Artyom from 'artyom.js';


const artyom = new Artyom()

interface Command {
    indexes: string[];
    action: () => void;
}

export default (comands: Command[]) => {
    artyom.fatality()
    artyom.addCommands(comands)
    artyom.initialize({
        lang: 'pl-PL',
        continuous: true,
        listen: true,
        debug: false,
        speed: 1,
    })
}
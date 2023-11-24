import { defineStore } from "pinia";
import { ref } from "vue";
import type { Annyang } from 'annyang';
import annyang from 'annyang';
import { SettingsStore } from '@/stores/settings';

export default defineStore('recogizer', () => {
    const userInput = ref<string>('')
    const output = ref<string>('')
    const recogizer = annyang as Annyang;

    function setup() {
        const { lang } = SettingsStore()
        recogizer.addCallback('result', (userSaid) => {
            if (userSaid) {
                userInput.value = userSaid[0]
            }
        })
        recogizer.setLanguage(lang)
        recogizer.start()
        return recogizer
    }

    return { userInput ,output, recogizer, setup }
})


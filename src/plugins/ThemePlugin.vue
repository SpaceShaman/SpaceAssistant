<script setup lang="ts">
import { SettingsStore, Themes } from '@/stores/settings'
import { onMounted } from 'vue'
import commandRecogizer from '../stores/commandRecogizer'
import type { CommandOption } from 'annyang'
import { storeToRefs } from 'pinia'

const { output } = storeToRefs(commandRecogizer())
const { recogizer } = commandRecogizer()

const store = SettingsStore()

function toggleTheme() {
  if (store.theme === Themes.dark) {
    store.theme = Themes.light
  } else {
    store.theme = Themes.dark
  }
  document.documentElement.setAttribute('data-bs-theme', store.theme)
  output.value = `Switched to ${store.theme} theme`
  store.save()
}

const commands: CommandOption = {
  [store.toggleThemeCommand]: toggleTheme as any
}

recogizer.addCommands(commands)

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', store.theme)
})
</script>

<template>
  <input
    @click.stop="toggleTheme"
    :class="{ dark: store.theme === Themes.dark }"
    class="toggle"
    type="checkbox"
  />
</template>

<style scoped>
.toggle {
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;

  --size: 2rem;

  appearance: none;
  outline: none;
  cursor: pointer;

  width: var(--size);
  height: var(--size);
  box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
  border-radius: 999px;
  color: var(--bs-body-color);

  transition: all 500ms;
}

.dark {
  --ray-size: calc(var(--size) * -0.4);
  --offset-orthogonal: calc(var(--size) * 0.65);
  --offset-diagonal: calc(var(--size) * 0.45);

  transform: scale(0.75);
  box-shadow:
    inset 0 0 0 var(--size),
    calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
    var(--offset-orthogonal) 0 0 var(--ray-size),
    0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
    0 var(--offset-orthogonal) 0 var(--ray-size),
    calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
    var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
    calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
    var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
}
</style>
<script setup lang="ts">
import { SettingsStore } from '@/stores/settings'
import commandRecogizer from '@/stores/commandRecogizer'
import { onMounted } from 'vue'

const settings = SettingsStore()
const { recogizer } = commandRecogizer()

function save() {
  settings.save()
  recogizer.setLanguage(settings.lang)
}

onMounted(() => {
  settings.load()
})
</script>
<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-col cols="auto">
        <div id="settings-button" data-bs-toggle="modal" data-bs-target="#settingsModal">
          <v-icon v-bind="props" size="x-large">mdi-cog</v-icon>
        </div>
      </v-col>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <div v-for="menu in settings.menu" :key="menu.key">
          <v-text-field
            v-if="menu.type == 'text'"
            :label="menu.label"
            v-model="(settings as any)[menu.key]"
          ></v-text-field>
          <v-select
            v-else-if="menu.type == 'select'"
            :label="menu.label"
            :items="(menu as any).options"
            v-model="(settings as any)[menu.key]"
          ></v-select>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
          <v-btn text="Save" @click="[(isActive.value = false), save()]"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<style scoped>
#settings-button {
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  transition: transform 2s;
}
#settings-button path {
  stroke: var(--bs--color);
}
#settings-button:hover {
  opacity: 0.8;
  transform: rotate(360deg);
}
#settings-button:active {
  opacity: 0.6;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

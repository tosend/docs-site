<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  code: { type: Boolean, default: true }
})

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <span class="copy-text" :class="{ copied }" @click="copy" title="Click to copy">
    <span class="copy-icon">

      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </span>
    <code v-if="code">{{ text }}</code>
    <span v-else>{{ text }}</span>
  </span>
</template>

<style scoped>
.copy-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: opacity 0.2s;
}

.copy-text:hover {
  opacity: 0.8;
}

.copy-text code {
  font-size: 0.85em;
}

.copy-icon {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
  flex-shrink: 0;
}

.copy-text:hover .copy-icon {
  color: var(--vp-c-brand-1);
}

.copy-text.copied .copy-icon {
  color: var(--vp-c-green-1, #10b981);
}
</style>

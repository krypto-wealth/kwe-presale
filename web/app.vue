<template>
  <NuxtLayout>
    <DialogsModal />
    <NuxtPage class="content-body" />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.content-body {
  min-height: calc(100vh - 392px);
}
</style>

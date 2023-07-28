<template>
  <Transition name="move">
    <div
      v-show="dialogs.currentDialog !== undefined && dialogs.show !== false"
      @click="dialogs.closeCurrentDialog()"
      class="custom-dialog"
    >
      <div @click.stop class="wrapper">
        <div class="dialog-form">
          <div v-if="hasCross" class="top-24px right-24px absolute p-0">
            <IconsMenuClose
              size="24"
              color="#fff"
              @click="dialogs.closeCurrentDialog()"
              class="cursor-pointer"
            />
          </div>
          <component
            :is="dialogs.currentDialog?.name ?? ''"
            v-bind="dialogs.currentDialog?.props"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useDialogs } from '@/store/dialogs'

const dialogs = useDialogs()

const hasCross = computed(
  () =>
    !(
      dialogs.currentDialog?.params?.notClosable || dialogs.currentDialog?.params?.noCross
    )
)
</script>

<style scoped lang="scss">
.move-enter-active,
.move-leave-active {
  transition: all 0.4s ease;
}
.move-enter-from,
.move-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
.custom-dialog {
  position: fixed;
  top: -50px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  background: #1e062850;

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  max-width: 335px;

  @media (min-width: 768px) {
    max-width: 520px;
  }
}

.dialog-form {
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0px 32px 64px rgba(36, 37, 38, 0.12);
  position: fixed;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(
    --2,
    linear-gradient(175deg, rgba(0, 16, 24, 0.63) 100%, rgba(0, 14, 22, 0.34) 100%)
  );
}
</style>

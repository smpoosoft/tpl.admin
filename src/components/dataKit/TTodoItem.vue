<template>
  <div class="todoItemWrapper">
    <!-- Drop zone: before this item -->
    <div
      class="dropIndicator"
      :class="{ 'dropIndicatorActive': isDropActive('before') }"
      @dragover.prevent.stop="onDragOver('before')"
      @dragleave="onDragLeave('before')"
      @drop.prevent.stop="onDrop('before')"
    />

    <!-- Item row -->
    <div
      class="todoItemRow"
      :class="{
        'dragging': isDragging,
        'childDropActive': isDropActive('child')
      }"
      :style="{ paddingLeft: `${level * 20 + 8}px` }"
      draggable="true"
      @dragstart.stop="onDragStart"
      @dragend="onDragEnd"
      @dragover.prevent.stop="onDragOver('child')"
      @dragleave="onDragLeave('child')"
      @drop.prevent.stop="onDrop('child')"
    >
      <span
        v-if="hasChildren"
        class="expandIcon"
        @click.stop="expanded = !expanded"
      >
        <i :class="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'" class="text-xs"></i>
      </span>
      <span v-else class="expandIcon"></span>

      <Checkbox
        :modelValue="item.done"
        @update:modelValue="$emit('toggle', item)"
        binary
        class="mr-2"
      />

      <span
        class="todoTitle flex-1 truncate text-sm"
        :class="{ 'line-through text-primary-700': item.done }"
      >
        {{ item.title }}
      </span>

      <span
        v-if="item.priority"
        class="priorityDot"
        :class="`priority-${item.priority}`"
      ></span>
    </div>

    <!-- Drop zone: after this item -->
    <div
      class="dropIndicator"
      :class="{ 'dropIndicatorActive': isDropActive('after') }"
      @dragover.prevent.stop="onDragOver('after')"
      @dragleave="onDragLeave('after')"
      @drop.prevent.stop="onDrop('after')"
    />

    <!-- Children -->
    <div v-if="expanded && hasChildren">
      <TodoItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :level="level + 1"
        :dragId="dragId"
        :dragOverId="dragOverId"
        :dragOverPos="dragOverPos"
        @toggle="(t) => $emit('toggle', t)"
        @dragstart="(id) => $emit('dragstart', id)"
        @dragend="() => $emit('dragend')"
        @dragover-item="(tid, pos) => $emit('dragover-item', tid, pos)"
        @drop-item="(tid, pos) => $emit('drop-item', tid, pos)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Checkbox from 'primevue/checkbox';
import type { TodoItemData } from './TTodoList.vue';

defineOptions({ name: 'TodoItem' });

const props = defineProps<{
  item: TodoItemData;
  level: number;
  dragId: number | null;
  dragOverId: number | null;
  dragOverPos: 'before' | 'after' | 'child';
}>();

const emit = defineEmits<{
  toggle: [item: TodoItemData];
  dragstart: [id: number];
  dragend: [];
  'dragover-item': [targetId: number, position: 'before' | 'after' | 'child'];
  'drop-item': [targetId: number, position: 'before' | 'after' | 'child'];
}>();

const expanded = ref(true);
const localDragOver = ref<string | null>(null);

const hasChildren = computed(() => props.item.children && props.item.children.length > 0);
const isDragging = computed(() => props.dragId === props.item.id);

function isDropActive(pos: 'before' | 'after' | 'child') {
  return props.dragOverId === props.item.id && props.dragOverPos === pos;
}

function onDragStart(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(props.item.id));
  }
  emit('dragstart', props.item.id);
}

function onDragEnd() {
  localDragOver.value = null;
  emit('dragend');
}

function onDragOver(pos: 'before' | 'after' | 'child') {
  localDragOver.value = pos;
  emit('dragover-item', props.item.id, pos);
}

function onDragLeave(pos: 'before' | 'after' | 'child') {
  if (localDragOver.value === pos) {
    localDragOver.value = null;
  }
}

function onDrop(pos: 'before' | 'after' | 'child') {
  localDragOver.value = null;
  emit('drop-item', props.item.id, pos);
}
</script>

<style scoped>
.todoItemRow {
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 0;
  cursor: grab;
  border-radius: 6px;
  transition: background-color 0.15s;
  user-select: none;
  min-height: 36px;
}

.todoItemRow:hover {
  background-color: var(--p-surface-100);
}

.dark .todoItemRow:hover {
  background-color: var(--p-surface-800);
}

.todoItemRow.dragging {
  opacity: 0.3;
  background-color: var(--p-primary-100);
}

.dark .todoItemRow.dragging {
  background-color: var(--p-primary-900);
}

.todoItemRow.childDropActive {
  background-color: color-mix(in srgb, var(--p-primary-color) 15%, transparent);
  outline: 2px dashed var(--p-primary-color);
  outline-offset: -2px;
}

.expandIcon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--p-primary-700);
}

.todoTitle {
  min-width: 0;
}

.priorityDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 8px;
}

.priority-high {
  background-color: #ef4444;
}

.priority-medium {
  background-color: #f59e0b;
}

.priority-low {
  background-color: #22c55e;
}

.dropIndicator {
  height: 3px;
  margin: 0 8px;
  border-radius: 2px;
  transition: all 0.15s;
}

.dropIndicatorActive {
  height: 4px;
  background-color: var(--p-primary-color);
  margin: 2px 8px;
  box-shadow: 0 0 4px var(--p-primary-color);
}
</style>

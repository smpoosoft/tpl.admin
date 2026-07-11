<template>
  <div class="todoList h-full flex flex-col min-h-0 overY">
    <div class="flex-1 min-h-0 overY py-1">
      <TodoItem v-for="item in modelValue" :key="item.id" :item="item" :level="0" :dragId="dragId"
        :dragOverId="dragOverId" :dragOverPos="dragOverPos" @toggle="onToggle" @dragstart="onDragStart"
        @dragend="onDragEnd" @dragover-item="onDragOverItem" @drop-item="onDropItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TodoItem from './TTodoItem.vue';

export interface TodoItemData {
  id: number;
  title: string;
  done: boolean;
  priority?: 'high' | 'medium' | 'low';
  children?: TodoItemData[];
}

const props = defineProps<{
  modelValue: TodoItemData[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: TodoItemData[]];
}>();

const dragId = ref<number | null>(null);
const dragOverId = ref<number | null>(null);
const dragOverPos = ref<'before' | 'after' | 'child'>('before');

function onToggle(item: TodoItemData) {
  item.done = !item.done;
  emit('update:modelValue', [...props.modelValue]);
}

function onDragStart(id: number) {
  dragId.value = id;
}

function onDragEnd() {
  dragId.value = null;
  dragOverId.value = null;
  dragOverPos.value = 'before';
}

function onDragOverItem(targetId: number, pos: 'before' | 'after' | 'child') {
  if (dragId.value === targetId) return;
  dragOverId.value = targetId;
  dragOverPos.value = pos;
}

function onDropItem(targetId: number, pos: 'before' | 'after' | 'child') {
  if (dragId.value === null || dragId.value === targetId) return;

  const items = JSON.parse(JSON.stringify(props.modelValue)) as TodoItemData[];
  const dragged = findAndRemove(items, dragId.value);
  if (!dragged) return;

  if (pos === 'child') {
    const target = findItem(items, targetId);
    if (target) {
      if (!target.children) target.children = [];
      target.children.push(dragged);
    }
  } else {
    insertAt(items, targetId, dragged, pos);
  }

  emit('update:modelValue', items);
  dragId.value = null;
  dragOverId.value = null;
}

function findItem(items: TodoItemData[], id: number): TodoItemData | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findAndRemove(items: TodoItemData[], id: number): TodoItemData | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item) continue;
    if (item.id === id) {
      const [removed] = items.splice(i, 1);
      return removed ?? null;
    }
    if (item.children) {
      const found = findAndRemove(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function insertAt(items: TodoItemData[], targetId: number, item: TodoItemData, position: 'before' | 'after') {
  for (let i = 0; i < items.length; i++) {
    const cur = items[i];
    if (!cur) continue;
    if (cur.id === targetId) {
      items.splice(position === 'before' ? i : i + 1, 0, item);
      return;
    }
    if (cur.children) {
      insertAt(cur.children, targetId, item, position);
    }
  }
}
</script>

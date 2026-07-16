<template>
  <div class="tFormItem" :style="itemStyle">
    <FloatLabel v-if="labelMode === 'float'" class="fullW">
      <slot>
        <InputComponent v-bind="mergedInputProps" :id="field" :model-value="fieldValue" @update:model-value="onUpdate">
          <template v-if="type === 'radio'">
            <RadioButton v-for="opt in options" :key="opt.id" :value="opt.id" :input-id="`${field}_${opt.id}`" />
          </template>
        </InputComponent>
      </slot>
      <label :for="field" class="tFormItemLabel">{{ label }}</label>
    </FloatLabel>

    <IftaLabel v-else-if="labelMode === 'ifta'" class="fullW">
      <label :for="field" class="tFormItemLabel">{{ label }}</label>
      <slot>
        <InputComponent v-bind="mergedInputProps" :id="field" :model-value="fieldValue" @update:model-value="onUpdate">
          <template v-if="type === 'radio'">
            <RadioButton v-for="opt in options" :key="opt.id" :value="opt.id" :input-id="`${field}_${opt.id}`" />
          </template>
        </InputComponent>
      </slot>
    </IftaLabel>

    <template v-else>
      <div class="tFormItemInner" :class="{ vertical: labelLayout === 'vertical' }">
        <label v-if="labelLayout === 'horizontal'" :for="field" class="tFormItemLabel horizontal"
          :class="[`align-${labelAlign}`]" :style="{ width: labelWidth }">
          <span v-if="required && showRequired" class="requiredMark">*</span>
          {{ label }}
        </label>
        <label v-if="labelLayout === 'vertical'" :for="field" class="tFormItemLabel vertical"
          :class="[`align-${labelAlign}`]">
          <span v-if="required && showRequired" class="requiredMark">*</span>
          {{ label }}
        </label>
        <div class="tFormItemControl">
          <slot>
            <InputComponent v-bind="mergedInputProps" :id="field" :model-value="fieldValue"
              @update:model-value="onUpdate">
              <template v-if="type === 'radio'">
                <RadioButton v-for="opt in options" :key="opt.id" :value="opt.id" :input-id="`${field}_${opt.id}`" />
              </template>
            </InputComponent>
          </slot>
          <slot name="addon-after" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import FloatLabel from 'primevue/floatlabel';
import IftaLabel from 'primevue/iftalabel';
import { useFormItem } from './useFormItem';
import type { TFormContext, TFormItemProps } from './types';

const props = withDefaults(defineProps<TFormItemProps>(), {
  placeholder: '',
  disabled: false,
  required: false,
  colSpan: 1,
  fractionDigits: undefined,
  mask: undefined,
  dateFormat: 'yy-mm-dd',
  rows: 3,
  inputProps: () => ({})
});

const ctx = inject<TFormContext>('tFormContext', {
  modelValue: ref({}),
  labelAlign: ref('right'),
  labelLayout: ref('horizontal'),
  labelMode: ref('default'),
  labelWidth: ref('100px'),
  showRequired: ref(true)
});

const { component: rawComponent, defaultProps } = useFormItem(props.type);
const InputComponent = rawComponent;

const labelMode = computed(() => ctx.labelMode.value);
const labelLayout = computed(() => ctx.labelLayout.value);
const labelAlign = computed(() => ctx.labelAlign.value);
const labelWidth = computed(() => ctx.labelWidth.value);
const showRequired = computed(() => ctx.showRequired.value);
const fieldValue = computed(() => ctx.modelValue.value[props.field]);

const mergedInputProps = computed(() => {
  const base: Record<string, any> = {
    ...defaultProps,
    placeholder: props.placeholder,
    disabled: props.disabled,
    fluid: true,
    ...props.inputProps
  };

  if (props.type === 'number' && props.fractionDigits !== undefined) {
    base.minFractionDigits = props.fractionDigits;
    base.maxFractionDigits = props.fractionDigits;
  }
  if ((props.type === 'date' || props.type === 'dateRange') && props.dateFormat) {
    base.dateFormat = props.dateFormat;
  }
  if (props.type === 'textarea' && props.rows) {
    base.rows = props.rows;
  }
  if (props.type === 'mask' && props.mask) {
    base.mask = props.mask;
  }
  if (props.options && ['select', 'multiSelect', 'treeSelect', 'autoComplete', 'radio'].includes(props.type)) {
    base.options = props.options;
  }

  return base;
});

const itemStyle = computed(() => {
  if (props.colSpan > 1) {
    return { gridColumn: `span ${props.colSpan}` };
  }
  return {};
});

const onUpdate = (val: any) => {
  ctx.modelValue.value[props.field] = val;
};
</script>

<style lang="scss" scoped>
.tFormItem {
  min-width: 0;
}

.tFormItemInner {
  display: flex;
  align-items: center;
  gap: 8px;

  &.vertical {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
}

.tFormItemLabel {
  font-size: 12px;
  font-weight: 500;
  color: var(--p-primary-900);
  white-space: nowrap;
  line-height: 1.4;

  &.horizontal {
    flex-shrink: 0;
    padding-top: 8px;
  }

  &.vertical {
    padding: 0;
  }

  &.align-left {
    text-align: left;
  }

  &.align-right {
    text-align: right;
  }
}

.tFormItemControl {
  flex: 1;
  min-width: 0;
}

.requiredMark {
  color: var(--p-red-500);
  margin-right: 2px;
}

:deep(.p-floatlabel),
:deep(.p-iftalabel) {
  width: 100%;
}
</style>

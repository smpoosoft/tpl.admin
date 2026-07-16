import type { Component } from 'vue';
import type { TFormItemType } from './types';

import TInputText from '@/components/dataKit/TInputText.vue';
import TInputNumber from '@/components/dataKit/TInputNumber.vue';
import TDatePicker from '@/components/dataKit/TDatePicker.vue';
import TToggleSwitch from '@/components/dataKit/TToggleSwitch.vue';
import TSelect from '@/components/dataKit/TSelect.vue';
import TTextarea from '@/components/dataKit/TTextarea.vue';
import TCheckbox from '@/components/dataKit/TCheckbox.vue';
import TRadioButtonGroup from '@/components/dataKit/TRadioButtonGroup.vue';
import TInputMask from '@/components/dataKit/TInputMask.vue';
import TMultiSelect from '@/components/dataKit/TMultiSelect.vue';
import TTreeSelect from '@/components/dataKit/TTreeSelect.vue';
import TAutoComplete from '@/components/dataKit/TAutoComplete.vue';
import TInputPassword from '@/components/dataKit/TInputPassword.vue';
import TFileUpload from '@/components/dataKit/TFileUpload.vue';

export interface FormCellMapping {
  component: Component;
  defaultProps: Record<string, any>;
}

const mappings: Record<TFormItemType, FormCellMapping> = {
  text: {
    component: TInputText,
    defaultProps: {}
  },
  number: {
    component: TInputNumber,
    defaultProps: { showButtons: false }
  },
  date: {
    component: TDatePicker,
    defaultProps: { dateFormat: 'yy-mm-dd', showIcon: true, fluid: true }
  },
  dateRange: {
    component: TDatePicker,
    defaultProps: { selectionMode: 'range', dateFormat: 'yy-mm-dd', showIcon: true, fluid: true }
  },
  switch: {
    component: TToggleSwitch,
    defaultProps: {}
  },
  select: {
    component: TSelect,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id', filter: true, showClear: true, fluid: true }
  },
  textarea: {
    component: TTextarea,
    defaultProps: { rows: 3, autoResize: true }
  },
  checkbox: {
    component: TCheckbox,
    defaultProps: { binary: true }
  },
  radio: {
    component: TRadioButtonGroup,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id' }
  },
  mask: {
    component: TInputMask,
    defaultProps: { autoClear: false }
  },
  multiSelect: {
    component: TMultiSelect,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id', display: 'chip', filter: true, fluid: true }
  },
  treeSelect: {
    component: TTreeSelect,
    defaultProps: { selectionMode: 'single' }
  },
  autoComplete: {
    component: TAutoComplete,
    defaultProps: { optionLabel: 'namezh', dropdown: true, fluid: true }
  },
  password: {
    component: TInputPassword,
    defaultProps: { toggleMask: true, feedback: true }
  },
  file: {
    component: TFileUpload,
    defaultProps: { mode: 'basic', auto: true }
  }
};

export function useFormTableCell(type: TFormItemType): FormCellMapping {
  return mappings[type] ?? mappings.text;
}
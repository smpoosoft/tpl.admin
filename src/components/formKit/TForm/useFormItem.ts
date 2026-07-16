import type { Component } from 'vue';
import type { TFormItemType } from './types';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import ToggleSwitch from 'primevue/toggleswitch';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import InputMask from 'primevue/inputmask';
import MultiSelect from 'primevue/multiselect';
import TreeSelect from 'primevue/treeselect';
import AutoComplete from 'primevue/autocomplete';
import InputPassword from 'primevue/password';
import FileUpload from 'primevue/fileupload';

export interface FormItemMapping {
  component: Component;
  defaultProps: Record<string, any>;
}

const mappings: Record<TFormItemType, FormItemMapping> = {
  text: {
    component: InputText,
    defaultProps: {}
  },
  number: {
    component: InputNumber,
    defaultProps: { showButtons: false }
  },
  date: {
    component: DatePicker,
    defaultProps: { dateFormat: 'yy-mm-dd', showIcon: true, fluid: true }
  },
  dateRange: {
    component: DatePicker,
    defaultProps: { selectionMode: 'range', dateFormat: 'yy-mm-dd', showIcon: true, fluid: true }
  },
  switch: {
    component: ToggleSwitch,
    defaultProps: {}
  },
  select: {
    component: Select,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id', filter: true, showClear: true, fluid: true }
  },
  textarea: {
    component: Textarea,
    defaultProps: { rows: 3, autoResize: true }
  },
  checkbox: {
    component: Checkbox,
    defaultProps: { binary: true }
  },
  radio: {
    component: RadioButtonGroup,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id' }
  },
  mask: {
    component: InputMask,
    defaultProps: { autoClear: false }
  },
  multiSelect: {
    component: MultiSelect,
    defaultProps: { optionLabel: 'namezh', optionValue: 'id', display: 'chip', filter: true, fluid: true }
  },
  treeSelect: {
    component: TreeSelect,
    defaultProps: { selectionMode: 'single' }
  },
  autoComplete: {
    component: AutoComplete,
    defaultProps: { optionLabel: 'namezh', dropdown: true, fluid: true }
  },
  password: {
    component: InputPassword,
    defaultProps: { toggleMask: true, feedback: true }
  },
  file: {
    component: FileUpload,
    defaultProps: { mode: 'basic', auto: true }
  }
};

export function useFormItem(type: TFormItemType): FormItemMapping {
  return mappings[type] ?? mappings.text;
}

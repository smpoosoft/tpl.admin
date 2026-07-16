import type { Ref } from 'vue';
import type { IKv } from '@/types/uiKite';

export type TFormItemType =
  | 'text' | 'number' | 'date' | 'dateRange'
  | 'switch' | 'select' | 'textarea'
  | 'checkbox' | 'radio' | 'mask'
  | 'multiSelect' | 'treeSelect' | 'autoComplete'
  | 'password' | 'file';

export interface TFormProps {
  modelValue: Record<string, any>;
  columns?: 1 | 2 | 3 | 4;
  labelAlign?: 'left' | 'right';
  labelLayout?: 'horizontal' | 'vertical';
  labelMode?: 'default' | 'float' | 'ifta';
  labelWidth?: string;
  gap?: number;
  rowGap?: number;
  showRequired?: boolean;
}

export interface TFormItemProps {
  type: TFormItemType;
  label: string;
  field: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  colSpan?: number;
  options?: IKv[];
  fractionDigits?: number;
  mask?: string;
  dateFormat?: string;
  rows?: number;
  inputProps?: Record<string, any>;
}

export interface TFormContext {
  modelValue: Ref<Record<string, any>>;
  labelAlign: Ref<'left' | 'right'>;
  labelLayout: Ref<'horizontal' | 'vertical'>;
  labelMode: Ref<'default' | 'float' | 'ifta'>;
  labelWidth: Ref<string>;
  showRequired: Ref<boolean>;
}

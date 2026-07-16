# TForm 表单组件系统

## 1. 组件概览

### 架构关系

```
TForm（表单容器）
├── 网格布局层：UnoCSS gridN（1~4 列）
├── 标签布局层：horizontal / vertical / FloatLabel
└── TFormItem（字段项）× N
    └── PrimeVue 数据组件（15 种类型）
```

### 设计目标

- 通过 `columns` prop 控制表单列数（1~4）
- 通过 `labelAlign` / `labelLayout` 控制标签对齐与排列方向
- 通过 `labelMode` 切换普通标签 / FloatLabel 模式
- 每个 TFormItem 声明 `type` 即可自动渲染对应的 PrimeVue 数据组件
- 支持 `colSpan` 跨列，适配备注、文件上传等宽字段

---

## 2. 数据组件 → PrimeVue v5 映射（15 种）

### 核心 7 种

| 类型标识 | 表单类型 | PrimeVue 组件 | 关键属性 | 业务场景 |
|---------|---------|--------------|---------|---------|
| `text` | 文本输入 | `InputText` | `v-model`, `placeholder`, `maxlength` | 姓名、编号、地址等 |
| `number` | 数字输入 | `InputNumber` | `minFractionDigits`, `maxFractionDigits`, `mode`, `locale`, `showButtons` | 金额、数量、比率（支持小数位数指定） |
| `date` | 日期输入 | `DatePicker` | `dateFormat`, `showIcon`, `fluid` | 下单日期、生效日期 |
| `dateRange` | 日期范围 | `DatePicker` | `selectionMode="range"`, `showIcon`, `fluid` | 有效期、合同周期 |
| `switch` | 是否开关 | `ToggleSwitch` | `v-model` (boolean) | 启用/禁用、是否默认 |
| `select` | 下拉选择 | `Select` | `:options`, `optionLabel="namezh"`, `optionValue="id"`, `filter`, `showClear` | 分类、状态、枚举值选择 |
| `textarea` | 备注 | `Textarea` | `rows`, `autoResize`, `placeholder` | 备注、说明、描述 |

### 扩展 8 种

| 类型标识 | 表单类型 | PrimeVue 组件 | 关键属性 | 业务场景 |
|---------|---------|--------------|---------|---------|
| `checkbox` | 复选框 | `Checkbox` | `v-model`, `binary` (单个) / `v-model` (数组多选) | 协议同意、多选标签 |
| `radio` | 单选组 | `RadioButtonGroup` + `RadioButton` | `:options`, `optionLabel`, `optionValue` | 性别、类型、枚举单选 |
| `mask` | 格式输入 | `InputMask` | `mask`, `placeholder`, `autoClear` | 手机号、身份证、统一社会信用代码 |
| `multiSelect` | 多选下拉 | `MultiSelect` | `:options`, `optionLabel="namezh"`, `optionValue="id"`, `display="chip"` | 多人员选择、多标签 |
| `treeSelect` | 树形选择 | `TreeSelect` | `:options`, `selectionMode`, `placeholder` | 部门/组织架构选择 |
| `autoComplete` | 自动完成 | `AutoComplete` | `:suggestions`, `@complete`, `optionLabel`, `dropdown` | 大数据量搜索式选择 |
| `password` | 密码输入 | `InputPassword` | `toggleMask`, `feedback` | 密码修改、密钥输入 |
| `file` | 文件上传 | `FileUpload` | `mode`, `accept`, `maxFileSize`, `auto` | 附件、图片上传 |

### 下拉选择的数据约定

所有涉及选项列表的组件（`select` / `multiSelect` / `radio` / `treeSelect` / `autoComplete`）统一使用项目已有的 `IKv` 接口：

```ts
interface IKv {
  id: number       // 选项值
  namezh: string   // 选项显示文本
}
```

对应 PrimeVue 的 `optionLabel="namezh"` + `optionValue="id"`。

---

## 3. 布局与辅助组件

### 布局组件

| PrimeVue 组件 | 用途 | 使用方式 |
|--------------|------|---------|
| `FloatLabel` | 浮动标签（label 浮于输入框上方，聚焦时上移） | `labelMode="float"` 时包裹输入组件 |
| `IftaLabel` | IFTA 风格标签（label 始终在输入框上方） | 可选的标签变体 |
| `Fluid` | 让子组件 100% 宽度 | 每个 TFormItem 内部包裹数据组件 |
| `IconField` + `InputIcon` | 输入框内嵌图标 | 搜索框、手机号等带图标的输入 |
| `InputGroup` + `InputGroupAddon` | 输入框前后附加内容 | 单位后缀（元、%）、前缀（¥、$） |

### 辅助组件

| PrimeVue 组件 | 用途 | 使用方式 |
|--------------|------|---------|
| `Message` | 表单验证错误提示 | TFormItem 底部显示校验错误 |
| `Divider` | 表单分区分隔线 | 表单内分组分隔 |
| `Fieldset` | 带标题的表单分组 | 替代 Panel 做表单分区 |

---

## 4. 布局方案

### 网格布局：UnoCSS gridN

利用项目 UnoCSS 已有的等分列规则：

| columns prop | UnoCSS class | 效果 |
|-------------|-------------|------|
| 1 | `grid1` | 单列全宽 |
| 2 | `grid2` | 双列等分 |
| 3 | `grid3` | 三列等分 |
| 4 | `grid4` | 四列等分 |

间距通过 `gapX` 系列控制（1 刻度 = 8px）：

```
gapX1 → 8px    gapX2 → 16px    gapX3 → 24px    gapX4 → 32px
```

跨列支持通过 CSS Grid 的 `grid-column: span N` 实现：

```html
<!-- colSpan=2 的字段项占两列 -->
<div style="grid-column: span 2">...</div>
```

### 标签布局

#### 水平模式（horizontal，默认）

```
┌──────────┬────────────────────┐
│  label → │  [数据组件]         │
└──────────┴────────────────────┘
```

- `labelAlign="right"`（默认）：标签右对齐，紧凑贴合输入框
- `labelAlign="left"`：标签左对齐，适合长标签

#### 垂直模式（vertical）

```
┌────────────────────────────────┐
│  label                         │
│  [数据组件]                     │
└────────────────────────────────┘
```

- 标签在上方，数据组件在下方
- 适合移动端或长标签场景

#### FloatLabel 模式（labelMode="float"）

```
┌────────────────────────────────┐
│  [label 浮于输入框内]           │
│  聚焦时 label 上移缩小          │
└────────────────────────────────┘
```

- 使用 PrimeVue `FloatLabel` 组件包裹
- 节省垂直空间，视觉现代

---

## 5. 核心 API 设计

### TForm Props

```ts
interface TFormProps {
  /** 表单数据对象，v-model 双向绑定 */
  modelValue: Record<string, any>

  /** 表单列数，1~4 */
  columns?: 1 | 2 | 3 | 4

  /** 标签水平对齐方式 */
  labelAlign?: 'left' | 'right'

  /** 标签排列方向 */
  labelLayout?: 'horizontal' | 'vertical'

  /** 标签模式 */
  labelMode?: 'default' | 'float' | 'ifta'

  /** 标签宽度（水平模式下生效） */
  labelWidth?: string

  /** 列间距档位（1 刻度 = 8px） */
  gap?: number

  /** 行间距档位（1 刻度 = 8px） */
  rowGap?: number

  /** 是否显示必填标记（红色星号） */
  showRequired?: boolean
}
```

### TFormItem Props

```ts
/** 数据组件类型 */
type TFormItemType =
  | 'text' | 'number' | 'date' | 'dateRange'
  | 'switch' | 'select' | 'textarea'
  | 'checkbox' | 'radio' | 'mask'
  | 'multiSelect' | 'treeSelect' | 'autoComplete'
  | 'password' | 'file'

interface TFormItemProps {
  /** 数据组件类型 */
  type: TFormItemType

  /** 字段标签文本 */
  label: string

  /** 绑定的字段名（对应 modelValue 的 key） */
  field: string

  /** 占位提示文本 */
  placeholder?: string

  /** 是否禁用 */
  disabled?: boolean

  /** 是否必填 */
  required?: boolean

  /** 跨列数（1~columns） */
  colSpan?: number

  /** 选项列表（select / multiSelect / radio / treeSelect / autoComplete） */
  options?: IKv[]

  /** 小数位数（number 类型专属） */
  fractionDigits?: number

  /** 输入掩码（mask 类型专属，如 '999-9999-9999'） */
  mask?: string

  /** 日期格式（date / dateRange 类型专属，默认 'yy-mm-dd'） */
  dateFormat?: string

  /** 文本域行数（textarea 类型专属，默认 3） */
  rows?: number

  /** 透传给底层 PrimeVue 组件的额外属性 */
  inputProps?: Record<string, any>

  /** 自定义插槽（优先级高于 type 渲染） */
  // 通过 slot 实现完全自定义内容
}
```

### TFormItem 插槽

```ts
// 默认插槽 — 完全自定义数据组件，覆盖 type 渲染
<TFormItem label="自定义" field="custom">
  <MyCustomComponent v-model="form.custom" />
</TFormItem>

// 前缀/后缀插槽 — 在数据组件前后插入内容
<TFormItem label="金额" field="amount" type="number">
  <template #addon-before>¥</template>
  <template #addon-after>元</template>
</TFormItem>
```

---

## 6. 文件结构建议

```
src/components/formKit/
├── TForm/
│   ├── TForm.vue              # 表单容器组件
│   ├── TFormItem.vue          # 表单字段项组件
│   ├── types.ts               # 类型定义（TFormProps, TFormItemProps, TFormItemType）
│   └── useFormItem.ts         # 字段项渲染逻辑 composable（type → 组件映射）
├── TTableList.vue             # 已有
└── TBtnExportImport.vue       # 已有
```

### useFormItem composable 职责

- 根据 `type` 返回对应的 PrimeVue 组件引用和默认 props
- 合并 `inputProps` 透传属性
- 处理 `options` 到 `optionLabel` / `optionValue` 的映射
- 处理 `fractionDigits` 到 `minFractionDigits` / `maxFractionDigits` 的映射

---

## 7. 使用示例

### 基础用法

```vue
<TForm v-model="formData" :columns="2" label-layout="horizontal" label-align="right">
  <TFormItem label="客户名称" field="customer" type="text" placeholder="请输入客户名称" />
  <TFormItem label="订单金额" field="amount" type="number" :fraction-digits="2" />
  <TFormItem label="下单日期" field="orderDate" type="date" />
  <TFormItem label="订单状态" field="status" type="select" :options="statusOptions" />
  <TFormItem label="是否加急" field="urgent" type="switch" />
  <TFormItem label="有效期" field="validRange" type="dateRange" />
  <TFormItem label="备注" field="remark" type="textarea" :col-span="2" :rows="3" />
</TForm>
```

### FloatLabel 模式

```vue
<TForm v-model="formData" :columns="3" label-mode="float" :gap="2">
  <TFormItem label="姓名" field="name" type="text" />
  <TFormItem label="手机号" field="phone" type="mask" mask="999-9999-9999" />
  <TFormItem label="部门" field="deptId" type="treeSelect" :options="deptTree" />
</TForm>
```

### 垂直标签模式

```vue
<TForm v-model="formData" :columns="1" label-layout="vertical">
  <TFormItem label="公司名称" field="company" type="text" required />
  <TFormItem label="统一社会信用代码" field="creditCode" type="mask" mask="99999999999999999A" />
  <TFormItem label="经营范围" field="scope" type="textarea" :col-span="1" />
</TForm>
```

### 自定义插槽

```vue
<TForm v-model="formData" :columns="2">
  <TFormItem label="头像" field="avatar">
    <TAvatarUpload v-model="formData.avatar" />
  </TFormItem>
  <TFormItem label="附件" field="files" type="file">
    <template #addon-after>
      <span class="fontSm textGray">支持 PDF、Word</span>
    </template>
  </TFormItem>
</TForm>
```

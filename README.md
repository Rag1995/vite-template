# Vite + Vue 3 專案範本

我自己開新專案時使用的起手式。預先整合好建置工具、路由、狀態管理、樣式與程式碼規範，建立專案後就能直接開始寫功能，不用每次重新設定。

## 技術組合

| 類別 | 使用的工具 |
| --- | --- |
| 框架與語言 | Vue 3（`<script setup>`）、TypeScript |
| 建置工具 | Vite |
| 路由 | Vue Router 5（檔案式路由） |
| 狀態管理 | Pinia |
| 組合式工具 | VueUse |
| 樣式 | Tailwind CSS 4、Sass |
| 自動匯入 | unplugin-auto-import、unplugin-vue-components |
| 程式碼規範 | ESLint（flat config）、Prettier、typescript-eslint、eslint-plugin-vue、simple-import-sort |
| 型別檢查 | vue-tsc |

## 快速開始

### 1. 用這個範本建立專案

在 GitHub 上點選 **Use this template** → **Create a new repository**，或用 degit 複製到本機：

```bash
npx degit Rag1995/vite-template my-app
cd my-app
```

### 2. 安裝與啟動

```bash
npm install
npm run dev
```

建議使用 Node.js 的最新 LTS 版本。

## 指令

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 先以 `vue-tsc` 做型別檢查，再打包到 `dist/` |
| `npm run preview` | 在本機預覽打包後的結果 |
| `npx eslint . --fix` | 檢查並自動修正程式碼風格 |

## 專案結構

```
src/
├── assets/                # 圖片等靜態資源（會經過 Vite 處理）
├── components/            # 元件，放在這裡會自動註冊
├── pages/                 # 頁面，檔案路徑即路由
├── App.vue
├── main.ts                # 建立 App，掛載 Router 與 Pinia
├── router.ts              # 建立 Router，並支援路由熱更新
├── style.css              # 全域樣式與 Tailwind CSS
├── auto-imports.d.ts      # 自動產生：自動匯入的 API 型別
└── vue-components.d.ts    # 自動產生：自動註冊的元件型別
```

`auto-imports.d.ts`、`vue-components.d.ts` 與根目錄的 `typed-router.d.ts` 都是工具自動產生的檔案，不需要手動編輯。

## 主要設定說明

### 檔案式路由

使用 Vue Router 5 內建的檔案式路由（`vue-router/vite`）。`src/pages/` 底下的檔案會自動成為路由：

```
src/pages/index.vue        →  /
src/pages/about.vue        →  /about
src/pages/users/[id].vue   →  /users/:id
```

路由會自動產生型別，`router.push()` 與 `<RouterLink>` 的路徑都有型別檢查與自動完成。修改頁面時也支援熱更新，不必重新整理。

### 自動匯入

以下 API 不需要 `import` 就能直接使用：

- `vue`：`ref`、`computed`、`watch`、`onMounted` 等
- `vue-router`：`useRoute`、`useRouter` 等
- `pinia`：`defineStore`、`storeToRefs` 等
- `@vueuse/core`：`useStorage`、`useElementSize`、`createFetch` 等

```vue
<script setup lang="ts">
// 不需要 import { ref } from 'vue'
const count = ref(0)
</script>
```

### 元件自動註冊

放在 `src/components/` 的元件會自動註冊，模板中直接使用即可。子資料夾會成為元件名稱的前綴，並自動合併重複的字首：

```
src/components/BaseButton.vue       →  <BaseButton />
src/components/user/UserCard.vue    →  <UserCard />
src/components/user/Avatar.vue      →  <UserAvatar />
```

### 路徑別名

`@` 指向 `src/`，避免出現一長串的 `../../`：

```ts
import { formatDate } from '@/utils/date'
```

### 程式碼風格

由 ESLint 統一檢查，Prettier 透過 ESLint 執行：

- 單引號、不加分號、每行最多 120 字元
- `import` 與 `export` 自動排序
- 沒有內容的標籤一律自閉合，例如 `<MyComponent />`、`<div />`
- 關閉 `vue/multi-word-component-names`，允許 `index.vue` 這類單字命名

### TypeScript

除了 `@vue/tsconfig` 的預設設定外，另外開啟：

- `noUnusedLocals`、`noUnusedParameters`：不允許未使用的變數與參數
- `noFallthroughCasesInSwitch`：`switch` 的每個 `case` 都要明確結束
- `erasableSyntaxOnly`：只允許能直接移除的型別語法，例如不使用 `enum`

## 建議的 VS Code 擴充套件

開啟專案時，VS Code 會提示安裝以下擴充套件（設定於 `.vscode/extensions.json`）：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 用範本開新專案後的待辦

- [ ] 修改 `package.json` 的 `name`
- [ ] 修改 `index.html` 的 `<title>`、`lang` 與 favicon
- [ ] 刪除範本內容：`src/components/HelloWorld.vue`、`src/assets/` 裡的範例圖片
- [ ] 清空 `src/style.css` 裡的範例樣式，只保留 `@import "tailwindcss";`
- [ ] 改寫這份 README

# AutoTop 3D - 畅销车型 3D 展厅

AutoTop 3D 是一个面向年轻用户、汽车爱好者和购车人群的 3D 汽车排行榜网站。首页展示畅销车型 Top10，详情页提供可旋转、缩放、拖拽的 3D 展厅体验，并展示销量、价格、能源类型、车身尺寸和销量趋势。

> 当前所有榜单与销量均为演示 mock 数据，不代表实时排名。

## 技术栈

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- React Three Fiber + Drei + Three.js
- Zustand
- Recharts
- Framer Motion
- lucide-react

## 功能说明

- 首页 `/`
  - Hero 区域、搜索框、能源/车型筛选
  - Top10 车型排行榜卡片
  - 车型对比，最多选择 3 辆
  - AI 购车助手入口，当前为本地 mock 回复

- 详情页 `/cars/[id]`
  - 3D 车型展示区
  - 支持拖拽旋转、滚轮缩放、移动端手势
  - 支持自动旋转、重置视角、车漆切换、灯光开关
  - GLB 加载失败时自动 fallback 到 LowPolyCar
  - 车型参数面板、销量趋势图、推荐车型、分享海报展示

- 数据来源页 `/data-source`
  - 说明 mock 数据与后续接入策略
  - 数据读取统一封装在 `src/lib/carDataProvider.ts`

- 关于页 `/about`
  - 项目定位、技术栈和未来规划

- API
  - `GET /api/cars`
  - `GET /api/cars/[id]`
  - `POST /api/ai/recommend`

## 如何运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 如何替换真实 3D 模型

1. 将真实 `.glb` 文件放入 `public/models/`，例如：

```text
public/models/model-y.glb
```

2. 修改 `src/data/cars.ts` 中对应车型的 `modelUrl`：

```ts
modelUrl: "/models/model-y.glb"
```

3. 如果模型加载失败，页面会自动显示 `LowPolyCar`，不会白屏。

## 如何接入真实销量榜数据

当前数据在 `src/data/cars.ts`，读取入口在：

```text
src/lib/carDataProvider.ts
```

后续可以将 `getTopSellingCars()` 替换为：

- 调用自有后端接口
- 读取 CMS
- 接入第三方 API
- 对公开榜单做合规采集、清洗与缓存

页面组件不直接读取外部平台，避免数据逻辑散落在 UI 中。

### 每周真实数据（推荐做法）

项目已支持通过环境变量 `CAR_DATA_URL` 从远程 JSON 拉取榜单数据，并在服务端按周缓存（默认 7 天刷新一次）。

- **配置**：在 Vercel 项目环境变量中设置 `CAR_DATA_URL`
- **数据格式**（二选一）：
  - 直接返回数组：`Car[]`
  - 或对象：`{ "cars": Car[] }`
- **增量覆盖**：远程数据只要包含 `id`，就会与本地 `src/data/cars.ts` 进行合并（例如只更新 `rank/monthlySales/yoy/mom/priceRange/coverImage/modelUrl`）

你可以用任意方式每周生成这份 JSON（自建后端、定时任务、爬取清洗后落地到对象存储等），前端会自动读取并更新展示。

## 如何接入 OpenRouter AI 推荐

创建 `.env.local`：

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
```

当前 `POST /api/ai/recommend` 支持 OpenRouter；若未配置 `OPENROUTER_API_KEY` 会自动回退到本地规则推荐：

```text
src/app/api/ai/recommend/route.ts
```

填入环境变量后，将调用 OpenRouter Chat Completions API。

## 真实图片与真实 3D 模型

- **真实图片**：`coverImage` 已支持直接使用网络图片 URL（示例使用 Unsplash），并已在 `next.config.ts` 允许 `images.unsplash.com`。
- **真实 3D 模型**：将 `.glb` 放到 `public/models/` 并在 `src/data/cars.ts` 配置 `modelUrl`（或使用外部可访问的 `.glb` URL）。未配置时会自动使用 `LowPolyCar`，仍可拖拽/缩放交互，不会白屏。

## 项目截图占位

后续可补充：

- 首页排行榜截图
- 车型 3D 展厅截图
- 移动端适配截图
- AI 购车助手截图

## 后续优化方向

- 接入实时销量榜
- 接入高质量真实 3D 模型
- 支持 AR 看车
- 支持车型参数深度对比
- 支持 AI 购车助手真实模型调用
- 增加收藏、分享和海报下载
- 增加车型配置版本选择

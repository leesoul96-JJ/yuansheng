# 源生万象｜YUANSHENG

**ORIGIN INSIGHT** — 传统文化中的自我认知智慧

深色包豪斯风格的命理咨询服务网站，支持 Stripe/PayPal/加密货币支付。

## 技术栈

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Stripe 支付集成

## 页面

| 路由 | 内容 |
|---|---|
| `/` | 首页 — 品牌故事、服务预览 |
| `/services` | 咨询服务 — 定价与购买 |
| `/products` | 产品目录 — 水晶、线香、蜡烛、月历 |
| `/membership` | 年度会员 $400/年 $40/月 |
| `/about` | 品牌故事 |
| `/contact` | 预约/咨询表单 |
| `/api/checkout` | Stripe 结账 API |

## 部署

### 方式一：Cloudflare Pages（推荐，中国可访问）

1. 注册 [Cloudflare](https://dash.cloudflare.com/sign-up)（支持 +86 手机号）
2. 注册 [GitHub](https://github.com/signup)（无需手机号，邮箱即可）
3. 联系我推送代码到 GitHub 仓库
4. 在 Cloudflare Pages 中连接该 GitHub 仓库
5. 构建命令：`npm run build`，输出目录：`.next`
6. 部署完成，自动获得 `xxxx.pages.dev` 域名

### 方式二：Vercel

1. 注册 [Vercel](https://vercel.com)（需海外手机号）
2. 连接 GitHub 仓库即可自动部署
3. 暂无法直接访问中国大陆

## 本地开发

```bash
npm install
npm run dev
# 打开 http://localhost:3000
```

## Stripe 配置

创建 `.env.local`：

```
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```
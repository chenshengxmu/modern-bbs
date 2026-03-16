# Modern BBS

一个现代化的、响应式的 BBS (电子公告牌系统) 应用程序，采用全栈 TypeScript 开发。

## 🚀 技术栈

### 前端
- **React 19** - UI 库
- **Vite 8** - 构建工具
- **TypeScript** - 静态类型检查
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Zustand** - 状态管理
- **React Query** - 数据获取与缓存
- **React Router 7** - 路由管理
- **Lucide React** - 图标库

### 后端
- **Express 5** - Web 框架
- **Prisma** - ORM
- **LibSQL (SQLite)** - 数据库
- **JWT** - 用户认证
- **Multer** - 文件上传
- **Zod** - 数据验证

## 📁 项目结构

```
modern-bbs/
├── frontend/          # 前端应用 (React + Vite)
├── backend/           # 后端应用 (Express + Prisma)
└── README.md          # 项目说明
```

## 🛠️ 快速开始

### 前提条件
- Node.js (建议 v18+)
- npm 或 yarn

### 1. 克隆项目
```bash
git clone https://github.com/chenshengxmu/modern-bbs.git
cd modern-bbs
```

### 2. 后端配置
```bash
cd backend
npm install
# 创建 .env 文件并配置环境变量 (例如 DATABASE_URL, JWT_SECRET)
cp .env.example .env # 如果有 example 的话
# 初始化数据库
npx prisma migrate dev
# 启动开发服务器
npm run dev
```

### 3. 前端配置
```bash
cd ../frontend
npm install
# 启动开发服务器
npm run dev
```

## ✨ 主要功能
- 🔐 用户注册与登录 (JWT 认证)
- 📝 创建、查看和回复帖子
- 📁 图片上传功能
- 👤 个人资料管理
- 📱 完全响应式设计

## 📄 许可证
[ISC License](LICENSE)

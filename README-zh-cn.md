<p align="center">
  <picture>
    <source srcset="apps/mail/public/white-icon.svg" media="(prefers-color-scheme: dark)">
    <img src="apps/mail/public/black-icon.svg" alt="Zero Logo" width="64" style="background-color: #000; padding: 10px;"/>
  </picture>
</p>

# Zero

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnizzyabi%2FMail0&env=DATABASE_URL,BETTER_AUTH_SECRET,BETTER_AUTH_URL,BETTER_AUTH_TRUSTED_ORIGINS,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,GITHUB_REDIRECT_URI&envDescription=For%20more%20info%20on%20setting%20up%20your%20API%20keys%2C%20checkout%20the%20Readme%20below&envLink=https%3A%2F%2Fgithub.com%2Fnizzyabi%2FMail0%2Fblob%2Fmain%2FREADME.md&project-name=0&repository-name=0&redirect-url=0.email&demo-title=0&demo-description=An%20open%20source%20email%20app&demo-url=0.email)

面向未来的开源 Gmail 替代方案

## 什么是 Zero?

Zero 是一个开源的 AI 邮件解决方案，允许用户**自托管**自己的邮件应用，并支持与 Gmail 等其他邮件服务的集成。我们的目标是借助 AI 代理来改进电子邮件，使其真正实现现代化。

## 为什么用 Zero?

当今大多数邮件服务要么是**闭源**的、**数据贪婪**的，要么就是**自托管过于复杂**。
0.email 则与众不同：

- ✅ **开源** – 没有隐藏的动机，完全透明。
- 🦾 **AI驱动** - 通过 Agents 和 LLMs 增强你的电子邮件。
- 🔒 **数据隐私优先** – 你的邮件，你的数据。Zero 不会以任何方式追踪、收集或出售你的数据。请注意：尽管我们集成了一些外部服务，但通过这些服务传递的数据不在我们的控制范围内，并且遵循它们各自的隐私政策和服务条款。
- ⚙️ **自主托管的自由** – 轻松运行你自己的邮件应用。
- 📬 **统一的收件箱** – 可连接多个邮件提供商，如 Gmail、Outlook 等。
- 🎨 **可定制的界面和功能** – 按照你希望的方式定制你的邮件体验。
- 🚀 **开发友好** – 构建时充分考虑了可扩展性和集成需求。

## 技术栈

Zero 基于现代且可靠的技术构建：

- **前端**: Next.js, React, TypeScript, TailwindCSS, Shadcn UI
- **后端**: Node.js, Drizzle ORM
- **数据库**: PostgreSQL
- **认证**: Better Auth, Google OAuth
<!-- - **Testing**: Jest, React Testing Library -->

## 入门

### 环境要求

**所需版本:**

- [Node.js](https://nodejs.org/en/download) (v18 或更高)
- [Bun](https://bun.sh) (v1.2 或更高)
- [Docker](https://docs.docker.com/engine/install/) (v20 或更高)

在运行应用程序之前，您需要设置服务并配置环境变量。有关环境变量的更多详细信息，请参阅 [Environment Variables](#environment-variables) 部分.

### 启动方式

您可以通过两种方式启动Zero:

<details open>
<summary><b>Option 1: Standard Setup (Recommended)</b></summary>

#### Quick Start Guide

1. **Clone and Install**

   ```bash
   # Clone the repository
   git clone https://github.com/Mail-0/Zero.git
   cd Zero

   # Install dependencies
   bun install

   # Start database locally
   bun docker:up
   ```

2. **Set Up Environment**

   - Copy `.env.example` to `.env` in project root
     ```bash
     cp .env.example .env
     ```
   - Configure your environment variables (see below)
   - Start the database with the provided docker compose setup: `bun docker:up`
   - Initialize the database: `bun db:push`

3. **Start the App**

   ```bash
   bun dev
   ```

4. **Open in Browser**

   Visit [http://localhost:3000](http://localhost:3000)
   </details>

<details>
<summary><b>Option 2: Dev Container Setup (For VS Code Users)</b></summary>

This option uses VS Code's Dev Containers feature to provide a fully configured development environment with all dependencies pre-installed. It's great for ensuring everyone on the team has the same setup.

1. **Prerequisites**

   - [Docker](https://docs.docker.com/get-docker/)
   - [VS Code](https://code.visualstudio.com/) or compatible editor
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Open in Dev Container**

   - Clone the repository: `git clone https://github.com/Mail-0/Zero.git`
   - Open the folder in VS Code
   - When prompted, click "Reopen in Container" or run the "Dev Containers: Open Folder in Container" command
   - VS Code will build and start the dev container (this may take a few minutes the first time)

3. **Access the App**

   - The app will be available at [http://localhost:3000](http://localhost:3000)

4. **Troubleshooting**
   - If you encounter issues with the container, try rebuilding it using the "Dev Containers: Rebuild Container" command
   - For dependency issues inside the container:
     `bash
rm -rf node_modules
rm bun.lockb
bun install
`
     </details>

### Environment Setup

1. **Better Auth Setup**

   - Open the `.env` file and change the BETTER_AUTH_SECRET to a random string. (Use `openssl rand -hex 32` to generate a 32 character string)

     ```env
     BETTER_AUTH_SECRET=your_secret_key
     ```

2. **Google OAuth Setup** (Required for Gmail integration)

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Add the following APIs in your Google Cloud Project: [People API](https://console.cloud.google.com/apis/library/people.googleapis.com), [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com)
     - Use the links above and click 'Enable' or
     - Go to 'APIs and Services' > 'Enable APIs and Services' > Search for 'Google People API' and click 'Enable'
     - Go to 'APIs and Services' > 'Enable APIs and Services' > Search for 'Gmail API' and click 'Enable'
   - Enable the Google OAuth2 API
   - Create OAuth 2.0 credentials (Web application type)
   - Add authorized redirect URIs:
     - Development:
       - `http://localhost:3000/api/auth/callback/google`
     - Production:
       - `https://your-production-url/api/auth/callback/google`
   - Add to `.env`:

     ```env
     GOOGLE_CLIENT_ID=your_client_id
     GOOGLE_CLIENT_SECRET=your_client_secret
     ```

   - Add yourself as a test user:

     - Go to [`Audience`](https://console.cloud.google.com/auth/audience)
     - Under 'Test users' click 'Add Users'
     - Add your email and click 'Save'

> [!WARNING]
> The authorized redirect URIs in Google Cloud Console must match **exactly** what you configure in the `.env`, including the protocol (http/https), domain, and path - these are provided above.

### Environment Variables

Copy `.env.example` located in the project folder to `.env` in the same folder and configure the following variables:

```env
# Auth
BETTER_AUTH_SECRET=     # Required: Secret key for authentication

# Google OAuth (Required for Gmail integration)
GOOGLE_CLIENT_ID=       # Required for Gmail integration
GOOGLE_CLIENT_SECRET=   # Required for Gmail integration

# Database
DATABASE_URL=           # Required: PostgreSQL connection string for backend connection

# Redis
REDIS_URL=              # Redis URL for caching (http://localhost:8079 for local dev)
REDIS_TOKEN=            # Redis token (upstash-local-token for local dev)
```

For local development a connection string example is provided in the `.env.example` file located in the same folder as the database.

### Database Setup

Zero uses PostgreSQL for storing data. Here's how to set it up:

1. **Start the Database**

   Run this command to start a local PostgreSQL instance:

   ```bash
   bun docker:up
   ```

   This creates a database with:

   - Name: `zerodotemail`
   - Username: `postgres`
   - Password: `postgres`
   - Port: `5432`

2. **Set Up Database Connection**

   Make sure your database connection string is in `.env` file.

   For local development use:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zerodotemail"
   ```

3. **Database Commands**

   - **Set up database tables**:

     ```bash
     bun db:push
     ```

   - **Create migration files** (after schema changes):

     ```bash
     bun db:generate
     ```

   - **Apply migrations**:

     ```bash
     bun db:migrate
     ```

   - **View database content**:
     ```bash
     bun db:studio
     ```
     > If you run `bun dev` in your terminal, the studio command should be automatically running with the app.

## Contribute

Please refer to the [contributing guide](.github/CONTRIBUTING.md).

If you'd like to help with translating Zero to other languages, check out our [translation guide](.github/TRANSLATION.md).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Mail-0/Zero&type=Timeline)](https://star-history.com/#Mail-0/Zero&Timeline)

## This project wouldn't be possible without these awesome companies

<div style="display: flex; justify-content: center;">
  <a href="https://vercel.com" style="text-decoration: none;">
    <img src="public/vercel.png" alt="Vercel" width="96"/>
  </a>
  <a href="https://better-auth.com" style="text-decoration: none;">
    <img src="public/better-auth.png" alt="Better Auth" width="96"/>
  </a>
  <a href="https://orm.drizzle.team" style="text-decoration: none;">
    <img src="public/drizzle-orm.png" alt="Drizzle ORM" width="96"/>
  </a>
  <a href="https://coderabbit.com" style="text-decoration: none;">
    <img src="public/coderabbit.png" alt="Coderabbit AI" width="96"/>
  </a>
</div>

## 🤍 The team

Curious who makes Zero? Here are our [contributors and maintainers](https://0.email/contributors)

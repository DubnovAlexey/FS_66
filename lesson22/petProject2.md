## Для фронтэнд девелопера со стеком js-react-redux-rtk-mySQL-docker какое пробное задание было бы интересное делать за пару месяцев для портфолио при поиске работы?  


Для такого стека я бы делал не очередной **Todo / интернет-магазин / weather app**, а проект, который выглядит как небольшой реальный SaaS-продукт. За 1.5–2 месяца он должен показать работодателю не количество технологий, а то, что ты умеешь проектировать интерфейс, состояние приложения, API и данные как разработчик.

## Проект: LeadFlow — CRM для малого бизнеса

Идея: веб-приложение для управления лидами, клиентами и сделками.

Стек:

```text
Frontend:
React
JavaScript
Redux Toolkit
RTK Query
React Router

Backend:
Node.js
Express

Database:
MySQL

Infrastructure:
Docker
Docker Compose
```

Опционально:

```text
Socket.IO
Vitest
React Testing Library
Playwright
Chart.js / Recharts
```

Главный пользовательский сценарий:

```text
Login
  ↓
CRM Dashboard
  ↓
Leads
  ↓
Deal Pipeline
  ↓
Client profile
  ↓
Notes / Tasks / Activity
```

## 1. Основная концепция

Компания получает лидов и двигает их по воронке продаж.

Например:

```text
New Lead
   ↓
Contacted
   ↓
Qualified
   ↓
Proposal
   ↓
Negotiation
   ↓
Won / Lost
```

Каждая сделка связана с клиентом и ответственным менеджером.

Пример:

```text
LeadFlow CRM

Pipeline: Website Sales

New             Qualified        Proposal        Won

Acme Ltd        BrightSoft       DevHouse        GreenLabs
$8,000          $12,000          $4,500          $15,000

TechNova        PixelWorks
$6,500          $3,000
```

Карточки можно drag & drop между стадиями.

## 2. Основные сущности

```text
Users
Workspaces
Companies
Contacts
Deals
Pipelines
Pipeline Stages
Tasks
Notes
Activities
Tags
```

Можно сделать чуть проще для MVP:

```text
Users
Companies
Contacts
Deals
Tasks
Activities
```

## 3. Страницы

### `/login`

Обычная авторизация.

```text
Email
Password

[ Login ]
```

### `/dashboard`

Главный экран CRM.

Например:

```text
Dashboard

Open Deals
24

Pipeline Value
$128,500

Deals Won This Month
8

Conversion Rate
31%

──────────────

Sales Pipeline
[ chart ]

Recent Activity
[ timeline ]
```

Это хорошее место для графиков и derived data.

## 4. Страница сделок

### `/deals`

Kanban pipeline:

```text
Pipeline: Sales

New           Contacted       Proposal       Won

Acme          BrightSoft      DevHouse       GreenLabs
$8,000        $12,000         $4,500         $15,000

NovaTech      PixelWorks
$6,000        $3,000
```

Каждая карточка:

```text
Acme Ltd

Website redesign

$8,000

John Smith

Next task:
Call tomorrow
```

Можно фильтровать:

```text
Owner
Stage
Value
Tag
Company
Created date
```

И поиск:

```text
Search deals...
```

## 5. Deal detail

Можно открыть drawer или отдельную страницу.

```text
DEAL

Website Redesign

Acme Ltd

Value
$8,000

Stage
Proposal

Owner
John Smith

Expected close
24 Aug 2026

Probability
60%

────────────

Contact

Anna Brown
anna@acme.com

────────────

Notes

Client wants delivery before October.

────────────

Tasks

[ ] Send updated proposal
[ ] Schedule technical call

────────────

Activity

John changed stage
Qualified → Proposal

Anna added note

John changed value
$6,000 → $8,000
```

Вот здесь уже получается богатый UI.

## 6. Companies

### `/companies`

Таблица:

```text
Company        Industry        Deals     Value       Owner
Acme Ltd       SaaS            3         $28,000     John
BrightSoft     FinTech         2         $15,000     Maria
GreenLabs      Healthcare      1         $9,000      Alex
```

Функции:

```text
search
sorting
pagination
filters
bulk selection
```

Это отлично показывает enterprise frontend.

## 7. Company profile

```text
Acme Ltd

Industry
SaaS

Website
acme.com

Owner
John Smith

────────────

Contacts

Anna Brown
CTO

Mike Green
CEO

────────────

Deals

Website redesign
$8,000
Proposal

Mobile App
$15,000
Qualified

────────────

Recent Activity
```

## 8. Contacts

### `/contacts`

```text
Name          Company       Position      Email
Anna Brown    Acme Ltd      CTO           anna@...
Mike Green    Acme Ltd      CEO           mike@...
```

При открытии контакта:

```text
Anna Brown

Company
Acme Ltd

Position
CTO

Email
anna@...

Phone
...

Related deals
Notes
Tasks
Activity
```

## 9. MySQL schema

Минимум:

```sql
users

id
name
email
password_hash
created_at
updated_at
```

```sql
workspaces

id
name
owner_id
created_at
```

```sql
workspace_members

workspace_id
user_id
role
joined_at
```

Companies:

```sql
companies

id
workspace_id
name
industry
website
owner_id
created_at
updated_at
```

Contacts:

```sql
contacts

id
company_id
first_name
last_name
email
phone
position
created_at
updated_at
```

Pipelines:

```sql
pipelines

id
workspace_id
name
created_at
```

Stages:

```sql
pipeline_stages

id
pipeline_id
name
position
created_at
```

Deals:

```sql
deals

id
workspace_id
company_id
contact_id

pipeline_id
stage_id

title
value
currency

owner_id

probability
expected_close_date

position

created_at
updated_at
```

Tasks:

```sql
tasks

id
workspace_id
deal_id
assigned_to

title
description

status
due_date

created_at
updated_at
```

Activity:

```sql
activities

id
workspace_id

entity_type
entity_id

user_id
action

metadata

created_at
```

Например:

```json
{
  "action": "DEAL_STAGE_CHANGED",
  "metadata": {
    "from": "Qualified",
    "to": "Proposal"
  }
}
```

## 10. REST API

Auth:

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Companies:

```http
GET    /api/companies
POST   /api/companies

GET    /api/companies/:id
PATCH  /api/companies/:id
DELETE /api/companies/:id
```

Contacts:

```http
GET    /api/contacts
POST   /api/contacts

GET    /api/contacts/:id
PATCH  /api/contacts/:id
DELETE /api/contacts/:id
```

Deals:

```http
GET    /api/deals
POST   /api/deals

GET    /api/deals/:id
PATCH  /api/deals/:id
DELETE /api/deals/:id
```

Перемещение сделки:

```http
PATCH /api/deals/:id/move
```

Body:

```json
{
  "stageId": 4,
  "position": 2
}
```

Tasks:

```http
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Activity:

```http
GET /api/activities
GET /api/deals/:id/activity
GET /api/companies/:id/activity
```

## 11. Redux architecture

Я бы сделал:

```text
store

authSlice
uiSlice
filtersSlice

api
  RTK Query
```

Не надо хранить сделки в обычном Redux slice.

RTK Query:

```text
getDeals
getDeal
createDeal
updateDeal
deleteDeal
moveDeal

getCompanies
getCompany

getContacts
getTasks
getActivities
```

## 12. Что показать через RTK Query

Обязательно:

```text
providesTags
invalidatesTags
onQueryStarted
updateQueryData
selectFromResult
```

Например, при изменении сделки не делать тупо глобальный refetch всей CRM.

## 13. Optimistic updates

Очень важная часть.

Когда пользователь двигает сделку:

```text
Qualified
   ↓
Proposal
```

карточка должна сразу появляться в новой колонке.

Flow:

```text
drag deal
↓
optimistic update
↓
PATCH /move
↓
success
```

При ошибке:

```text
rollback
```

Это один из самых сильных моментов проекта для интервью.

## 14. Pipeline metrics

Можно вычислять:

```text
Total pipeline value
Won deals
Lost deals
Average deal size
Conversion rate
Deals by stage
Deals by owner
```

Например:

```text
Qualified        $42,000
Proposal         $35,000
Negotiation      $18,000
Won              $51,000
```

Это добавляет нормальную работу с агрегированными данными.

## 15. Dashboard

На backend можно сделать endpoint:

```http
GET /api/dashboard
```

Ответ:

```json
{
  "openDeals": 24,
  "pipelineValue": 128500,
  "wonThisMonth": 8,
  "conversionRate": 31
}
```

И отдельно:

```json
{
  "dealsByStage": [
    {
      "stage": "New",
      "count": 12,
      "value": 28000
    }
  ]
}
```

Можно нарисовать 2–3 графика.

Не стоит превращать проект в BI-систему.

## 16. Фильтры

URL:

```text
/deals?owner=me&stage=proposal&minValue=5000
```

Это хороший detail для портфолио.

Например:

```text
Owner: Me
Stage: Proposal
Value: > $5000
Created: Last 30 days
```

И можно сделать:

```text
Clear filters
```

## 17. Tasks

CRM без follow-up задач выглядит немного пусто.

Пример:

```text
My Tasks

Today

[ ] Call Acme
    Deal: Website Redesign

[ ] Send proposal to BrightSoft
    Due 15:00

Tomorrow

[ ] Follow up with GreenLabs
```

Статусы:

```text
TODO
DONE
```

Этого достаточно.

## 18. Activity log

Это одна из лучших features для такого проекта.

```text
18:45 John moved deal
       Qualified → Proposal

18:42 Maria added note

18:37 John changed value
       $5,000 → $8,000

18:31 Anna created task
       Follow up tomorrow
```

Activity создаёт backend автоматически.

Это показывает хорошее разделение ответственности.

## 19. Permissions

Для MVP:

```text
OWNER
MANAGER
SALES
```

Например:

```text
OWNER
manage workspace
manage users
delete workspace

MANAGER
manage users
see all deals
edit all deals

SALES
manage own deals
see own clients
```

Backend должен реально проверять права.

## 20. Real-time bonus

Можно добавить:

```text
deal:created
deal:updated
deal:moved
task:created
activity:created
```

Например:

Менеджер А двинул сделку, и у менеджера Б pipeline обновился без refresh.

Очень хороший bonus, но не MVP.

## 21. Структура frontend

Например:

```text
src/

app/
  store.js
  router.jsx

features/
  auth/
  deals/
  companies/
  contacts/
  tasks/

pages/
  DashboardPage/
  DealsPage/
  CompanyPage/
  ContactsPage/
  TasksPage/

components/
  DealCard/
  PipelineColumn/
  DealDrawer/
  CompanyTable/
  ContactCard/
  ActivityFeed/
  FilterBar/

services/
  api.js

utils/
hooks/
```

## 22. Docker

```text
crm/

frontend/
backend/

docker-compose.yml
README.md
```

Compose:

```text
frontend
  ↓
backend
  ↓
mysql
```

В идеале:

```bash
docker compose up
```

и всё стартует.

## 23. Seed data

Обязательно сделать demo-data.

Например:

```text
Workspace:
Orbit CRM

Users:
John
Maria
Alex

Companies:
Acme
BrightSoft
GreenLabs
PixelWorks

Deals:
25–30

Contacts:
30+

Tasks:
15+

Activities:
50+
```

Чтобы приложение сразу выглядело живым.

## 24. Что тестировать

Минимум:

```text
login validation
create deal
deal filtering
move deal
optimistic rollback
permissions
company creation
task completion
```

E2E:

```text
login
→ open pipeline
→ create deal
→ move deal
→ add task
→ complete task
```

Этого достаточно для portfolio.

## 25. Что не делать

Я бы не добавлял:

```text
real email integration
Stripe
Google Calendar
OAuth
Twilio
WhatsApp
AI assistant
file storage
microservices
Kafka
Redis
Kubernetes
```

Это очень легко раздувает scope.

## 26. План на 8 недель

**Неделя 1:** auth, Docker, MySQL, migrations, layout, routing.

**Неделя 2:** companies и contacts.

**Неделя 3:** deals CRUD и deal details.

**Неделя 4:** pipeline и drag & drop.

**Неделя 5:** RTK Query cache, filters, optimistic updates.

**Неделя 6:** tasks, activity log, permissions.

**Неделя 7:** dashboard, charts, responsive, tests.

**Неделя 8:** polishing, seed data, deployment, README.

Если останется время — WebSocket.

## 27. Что особенно хорошо смотрится на интервью

У CRM есть несколько очень хороших тем для разговора:

```text
Почему RTK Query, а не обычный Redux?

Как реализовал optimistic update?

Как хранится порядок карточек?

Как устроены filters в URL?

Как устроены permissions?

Почему activity создаёт backend?

Как моделировал Companies / Contacts / Deals?

Как избежал лишних refetch?

Как синхронизировал Kanban с сервером?

Как обрабатываешь concurrent updates?
```

То есть проект помогает не только получить приглашение на интервью, но и даёт материал, о котором можно уверенно говорить.

===============================================




Ниже я бы сформулировал проект именно как **реальное техническое задание**, которое можно положить рядом с репозиторием и использовать как roadmap на 6–8 недель. Scope специально ограничен: после MVP приложение уже должно выглядеть законченным, а всё остальное — bonus.

# ТЗ: LeadFlow CRM

## 1. Цель проекта

Разработать CRM-систему для небольшой B2B-команды продаж.

Пользователи должны иметь возможность вести компании и контакты, создавать сделки, перемещать сделки по стадиям sales pipeline, назначать ответственных менеджеров, создавать follow-up задачи и видеть историю изменений.

Основной сценарий:

```text
Пользователь авторизуется
        ↓
Открывает Dashboard
        ↓
Открывает Pipeline
        ↓
Создаёт Deal
        ↓
Привязывает Company + Contact
        ↓
Назначает менеджера
        ↓
Перемещает Deal между стадиями
        ↓
Создаёт follow-up Task
        ↓
Закрывает Deal как Won / Lost
```

---

# 2. Технологический стек

### Frontend

```text
React
JavaScript
Redux Toolkit
RTK Query
React Router
CSS Modules / SCSS / Tailwind — на выбор
dnd-kit
```

### Backend

```text
Node.js
Express
JWT
bcrypt
```

### Database

```text
MySQL 8
```

### Infrastructure

```text
Docker
Docker Compose
```

### Tests

```text
Vitest
React Testing Library

опционально:
Playwright
```

---

# 3. Архитектура приложения

```text
Browser
   │
   ▼
React
   │
   ├── React Router
   ├── Redux Toolkit
   └── RTK Query
          │
          ▼
     REST API
          │
          ▼
    Node / Express
          │
          ▼
        MySQL
```

Docker:

```text
┌──────────────┐
│   Frontend   │
│    React     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Backend    │
│ Express API  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    MySQL     │
└──────────────┘
```

---

# 4. Пользовательские роли

Для MVP достаточно трёх.

```text
OWNER
MANAGER
SALES
```

### OWNER

Может:

```text
управлять workspace
создавать/удалять пользователей
просматривать все сделки
редактировать все сделки
управлять pipeline
```

### MANAGER

```text
просматривать все сделки
редактировать все сделки
назначать ответственных
просматривать dashboard команды
```

### SALES

```text
создавать сделки
редактировать свои сделки
создавать компании и контакты
управлять своими задачами
```

Важно:

> Permissions должны проверяться backend'ом, а не только скрытием кнопок во frontend.

---

# 5. Основные сущности

В MVP:

```text
User
Workspace
WorkspaceMember

Company
Contact

Pipeline
PipelineStage
Deal

Task
Activity
```

Не включать в MVP:

```text
email
chat
attachments
notifications
billing
calendar integrations
```

---

# 6. Страницы

## 6.1 Login

Route:

```text
/login
```

UI:

```text
LeadFlow

Email
[________________]

Password
[________________]

[ Sign in ]
```

Функциональность:

```text
validation
loading state
server error
redirect после login
```

---

# 6.2 Register

```text
/register
```

Поля:

```text
Name
Email
Password
Confirm Password
```

После регистрации:

```text
создать пользователя
↓
создать Workspace
↓
OWNER membership
↓
авторизовать пользователя
↓
redirect /dashboard
```

---

# 6.3 Application Layout

После login:

```text
┌──────────────┬──────────────────────────────┐
│ LeadFlow     │                              │
│              │                              │
│ Dashboard    │                              │
│ Deals        │          PAGE                │
│ Companies    │                              │
│ Contacts     │                              │
│ Tasks        │                              │
│              │                              │
│ Settings     │                              │
│              │                              │
│ John Smith   │                              │
└──────────────┴──────────────────────────────┘
```

Sidebar должен быть responsive.

---

# 7. Dashboard

Route:

```text
/dashboard
```

Показать четыре KPI.

```text
Open Deals          Pipeline Value
24                  $128,500

Won This Month      Win Rate
8                   31%
```

Ниже:

```text
Deals by Stage

New             8
Qualified       6
Proposal        5
Negotiation     3
```

И:

```text
Recent Activity
```

Например:

```text
John moved Acme Website
Qualified → Proposal

Maria created deal
Mobile App — $12,000

Alex closed deal
GreenLabs — Won
```

### API

```http
GET /api/dashboard/summary
```

Ответ:

```json
{
  "openDeals": 24,
  "pipelineValue": 128500,
  "wonThisMonth": 8,
  "winRate": 31,
  "dealsByStage": [
    {
      "stageId": 1,
      "name": "New",
      "count": 8,
      "value": 32000
    }
  ]
}
```

---

# 8. Deals Pipeline

Это **главная страница проекта**.

Route:

```text
/deals
```

UI:

```text
Deals

[ Search... ] [ Owner ▼ ] [ Value ▼ ]

New            Qualified       Proposal       Won
─────────────────────────────────────────────────────

Acme           BrightSoft      DevHouse       GreenLabs
Website        Platform        Redesign       API
$8,000         $12,000         $5,000         $15,000

NovaTech       PixelWorks
CRM            Mobile
$6,000         $7,500
```

Карточка Deal:

```text
Acme Ltd

Website redesign

$8,000

John Smith

Expected:
24 Aug
```

---

# 9. Drag & Drop

Использовать:

```text
dnd-kit
```

Deal можно перемещать:

```text
Qualified
    ↓
Proposal
```

Также должен меняться порядок внутри стадии.

Backend хранит:

```text
stage_id
position
```

### Endpoint

```http
PATCH /api/deals/:dealId/move
```

Body:

```json
{
  "stageId": 4,
  "position": 2
}
```

---

# 10. Optimistic Update

Это обязательная часть MVP.

Не должно быть:

```text
drag
↓
spinner
↓
request
↓
refetch
↓
render
```

Должно:

```text
drag
↓
UI меняется мгновенно
↓
request отправляется
↓
server success
```

Если request падает:

```text
rollback
+
toast
```

Например:

```text
Couldn't move deal.
Changes were reverted.
```

Для этого использовать:

```js
onQueryStarted
```

и:

```js
api.util.updateQueryData()
```

---

# 11. Deal creation

Кнопка:

```text
+ New Deal
```

Открывает modal/drawer.

Поля:

```text
Title *

Company *

Contact

Value *

Currency

Pipeline Stage *

Owner *

Probability

Expected Close Date
```

Validation:

```text
title required

company required

value >= 0

probability:
0–100
```

---

# 12. Deal Detail

Route:

```text
/deals/:dealId
```

или drawer поверх pipeline.

Я бы выбрал **drawer**, а URL всё равно обновлял.

Например:

```text
/deals/42
```

UI:

```text
Website Redesign

Acme Ltd

────────────────

Stage
Proposal

Value
$8,000

Owner
John Smith

Probability
60%

Expected close
24 Aug 2026

────────────────

Contact

Anna Brown
CTO

────────────────

Tasks

[ ] Send proposal
[ ] Call client

+ Add task

────────────────

Activity

John changed stage
Qualified → Proposal

Maria changed value
$6,000 → $8,000
```

---

# 13. Companies

Route:

```text
/companies
```

Использовать table UI.

```text
Company       Industry     Owner       Deals    Value

Acme          SaaS         John        3        $24,000
BrightSoft    FinTech      Maria       2        $16,000
GreenLabs     Health       John        1        $8,000
```

Обязательные возможности:

```text
pagination
sorting
search
filter by owner
```

URL:

```text
/companies?page=2&sort=name&q=acme
```

---

# 14. Company Detail

```text
/companies/:companyId
```

Пример:

```text
Acme Ltd

Website
acme.com

Industry
SaaS

Owner
John Smith

────────────────

Contacts

Anna Brown
CTO

Mike Stone
CEO

────────────────

Deals

Website Redesign
$8,000
Proposal

Mobile App
$12,000
Qualified

────────────────

Recent Activity
```

---

# 15. Contacts

Route:

```text
/contacts
```

Table:

```text
Name          Company       Position     Email

Anna Brown    Acme Ltd      CTO          anna@...
Mike Stone    Acme Ltd      CEO          mike@...
```

Фильтры:

```text
company
owner
search
```

---

# 16. Tasks

Route:

```text
/tasks
```

Это не generic Todo.

Каждая задача должна быть связана с CRM entity.

Например:

```text
My Tasks

TODAY

[ ] Call Anna Brown
    Acme Ltd · Website Redesign
    Due 14:00

[ ] Send updated proposal
    BrightSoft · Mobile App

TOMORROW

[ ] Follow up with GreenLabs
```

Минимальная модель:

```text
title
deal
assignedTo
dueDate
status
```

Статусы:

```text
TODO
DONE
```

---

# 17. Activity Log

Activity создаётся **только backend'ом**.

Frontend не должен делать:

```http
POST /activities
```

Пример:

Frontend:

```http
PATCH /api/deals/42
```

```json
{
  "value": 8000
}
```

Backend обнаруживает:

```text
old value = 6000
new value = 8000
```

И автоматически пишет activity:

```json
{
  "action": "DEAL_VALUE_CHANGED",
  "metadata": {
    "from": 6000,
    "to": 8000
  }
}
```

---

# 18. MySQL Schema

Я бы использовал примерно такую структуру.

## users

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

## workspaces

```sql
CREATE TABLE workspaces (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

## workspace_members

```sql
CREATE TABLE workspace_members (
    workspace_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,

    role ENUM(
        'OWNER',
        'MANAGER',
        'SALES'
    ) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (workspace_id, user_id),

    FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

---

# 19. companies

```sql
CREATE TABLE companies (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,
    owner_id BIGINT UNSIGNED,

    name VARCHAR(150) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    FOREIGN KEY (owner_id)
        REFERENCES users(id)
);
```

---

# 20. contacts

```sql
CREATE TABLE contacts (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,
    company_id BIGINT UNSIGNED,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),

    email VARCHAR(255),
    phone VARCHAR(50),
    position VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    FOREIGN KEY (company_id)
        REFERENCES companies(id)
);
```

---

# 21. pipelines

```sql
CREATE TABLE pipelines (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id)
);
```

---

# 22. pipeline_stages

```sql
CREATE TABLE pipeline_stages (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    pipeline_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(100) NOT NULL,
    position INT NOT NULL,

    stage_type ENUM(
        'OPEN',
        'WON',
        'LOST'
    ) DEFAULT 'OPEN',

    FOREIGN KEY (pipeline_id)
        REFERENCES pipelines(id)
);
```

Seed:

```text
New
Qualified
Proposal
Negotiation
Won
Lost
```

---

# 23. deals

```sql
CREATE TABLE deals (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,

    company_id BIGINT UNSIGNED,
    contact_id BIGINT UNSIGNED,

    pipeline_id BIGINT UNSIGNED NOT NULL,
    stage_id BIGINT UNSIGNED NOT NULL,

    owner_id BIGINT UNSIGNED NOT NULL,

    title VARCHAR(200) NOT NULL,

    value DECIMAL(12,2) DEFAULT 0,
    currency CHAR(3) DEFAULT 'USD',

    probability TINYINT UNSIGNED DEFAULT 0,

    expected_close_date DATE,

    position INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (company_id)
        REFERENCES companies(id),

    FOREIGN KEY (contact_id)
        REFERENCES contacts(id),

    FOREIGN KEY (owner_id)
        REFERENCES users(id),

    FOREIGN KEY (pipeline_id)
        REFERENCES pipelines(id),

    FOREIGN KEY (stage_id)
        REFERENCES pipeline_stages(id)
);
```

---

# 24. tasks

```sql
CREATE TABLE tasks (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,

    deal_id BIGINT UNSIGNED,

    assigned_to BIGINT UNSIGNED NOT NULL,

    title VARCHAR(200) NOT NULL,

    status ENUM(
        'TODO',
        'DONE'
    ) DEFAULT 'TODO',

    due_date DATETIME,

    completed_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (deal_id)
        REFERENCES deals(id),

    FOREIGN KEY (assigned_to)
        REFERENCES users(id)
);
```

---

# 25. activities

```sql
CREATE TABLE activities (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    workspace_id BIGINT UNSIGNED NOT NULL,

    user_id BIGINT UNSIGNED NOT NULL,

    entity_type ENUM(
        'DEAL',
        'COMPANY',
        'CONTACT',
        'TASK'
    ) NOT NULL,

    entity_id BIGINT UNSIGNED NOT NULL,

    action VARCHAR(100) NOT NULL,

    metadata JSON,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
);
```

---

# 26. REST API

Prefix:

```text
/api
```

## Auth

```http
POST /api/auth/register
POST /api/auth/login

GET  /api/auth/me

POST /api/auth/logout
```

Logout при JWT может просто очищать client credentials.

---

# 27. Workspace

```http
GET   /api/workspaces/current
PATCH /api/workspaces/current
```

Members:

```http
GET    /api/workspaces/current/members
POST   /api/workspaces/current/members
PATCH  /api/workspaces/current/members/:userId
DELETE /api/workspaces/current/members/:userId
```

---

# 28. Companies API

```http
GET    /api/companies
POST   /api/companies

GET    /api/companies/:id
PATCH  /api/companies/:id
DELETE /api/companies/:id
```

List поддерживает:

```text
?q=
&ownerId=
&page=
&limit=
&sort=
&order=
```

Например:

```http
GET /api/companies?q=acme&page=1&limit=20&sort=name&order=asc
```

---

# 29. Contacts API

```http
GET    /api/contacts
POST   /api/contacts

GET    /api/contacts/:id
PATCH  /api/contacts/:id
DELETE /api/contacts/:id
```

Queries:

```text
companyId
q
page
limit
```

---

# 30. Deals API

```http
GET    /api/deals
POST   /api/deals

GET    /api/deals/:id
PATCH  /api/deals/:id
DELETE /api/deals/:id
```

Перемещение:

```http
PATCH /api/deals/:id/move
```

Queries:

```text
pipelineId
stageId
ownerId
companyId

minValue
maxValue

q
```

---

# 31. Tasks API

```http
GET    /api/tasks
POST   /api/tasks

PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Completion можно сделать:

```http
PATCH /api/tasks/:id
```

```json
{
  "status": "DONE"
}
```

---

# 32. Activity API

Только read.

```http
GET /api/activities
```

Для сущности:

```http
GET /api/deals/:id/activities

GET /api/companies/:id/activities
```

Создание activity endpoint не нужен.

---

# 33. Dashboard API

```http
GET /api/dashboard/summary
```

Опционально:

```http
GET /api/dashboard/activity
```

---

# 34. Pipeline API

```http
GET /api/pipelines
GET /api/pipelines/:id
```

Для MVP pipeline можно создать seed-скриптом.

То есть **редактор Pipeline вообще не нужен**.

Это хороший способ уменьшить scope.

---

# 35. Redux architecture

Я бы держал store очень маленьким.

```text
store
│
├── authSlice
├── uiSlice
├── filtersSlice
│
└── apiSlice
     └── RTK Query
```

---

# 36. authSlice

Хранит только client auth state.

Например:

```js
{
  user: null,
  accessToken: null
}
```

Или token вообще держать через cookie.

Не хранить там:

```text
companies
deals
contacts
tasks
```

---

# 37. uiSlice

Например:

```js
{
  sidebarOpen: true,

  createDealModalOpen: false,

  openedDealId: null
}
```

---

# 38. filtersSlice

Только если фильтры нужны сразу в нескольких местах.

Например:

```js
{
  deals: {
    search: '',
    ownerId: null,
    stageId: null,
    minValue: null
  }
}
```

Но ещё лучше часть состояния хранить прямо в URL.

Например:

```text
/deals?owner=12&stage=4&q=acme
```

---

# 39. RTK Query

Например:

```text
apiSlice

├── auth
│
├── companies
├── contacts
├── deals
├── tasks
├── activities
└── dashboard
```

`tagTypes`:

```js
[
  'Company',
  'Contact',
  'Deal',
  'Task',
  'Activity',
  'Dashboard'
]
```

---

# 40. Endpoint organisation

Например:

```js
getDeals
getDeal

createDeal
updateDeal
deleteDeal
moveDeal

getCompanies
getCompany
createCompany
updateCompany

getContacts
createContact

getTasks
createTask
updateTask

getActivities

getDashboard
```

---

# 41. Cache strategy

Например:

```text
GET /deals

provides:
Deal/LIST
Deal/12
Deal/14
Deal/25
```

Create:

```text
invalidate:
Deal/LIST
Dashboard
```

Update конкретного deal:

```text
invalidate:
Deal/42
```

А для `moveDeal` лучше использовать optimistic cache update.

---

# 42. Frontend folders

Не обязательно следовать этому буквально, но хорошая отправная точка:

```text
src/

app/
  router.jsx
  store.js

services/
  api.js

features/

  auth/
    authSlice.js
    LoginForm.jsx

  deals/
    DealCard.jsx
    DealDrawer.jsx
    DealForm.jsx
    Pipeline.jsx
    PipelineColumn.jsx

  companies/
    CompanyTable.jsx
    CompanyForm.jsx

  contacts/
    ContactTable.jsx
    ContactForm.jsx

  tasks/
    TaskList.jsx
    TaskItem.jsx

  dashboard/
    MetricCard.jsx

pages/

  LoginPage.jsx
  RegisterPage.jsx

  DashboardPage.jsx

  DealsPage.jsx

  CompaniesPage.jsx
  CompanyPage.jsx

  ContactsPage.jsx

  TasksPage.jsx

components/

  AppLayout/
  Sidebar/
  Modal/
  Drawer/
  Select/
  Pagination/
  EmptyState/
  ErrorState/
```

---

# 43. Error handling

API должен возвращать единый формат ошибок.

Например:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "fields": {
      "email": "Email is already used"
    }
  }
}
```

HTTP statuses:

```text
400 validation

401 not authenticated

403 insufficient permissions

404 resource not found

409 conflict

500 server error
```

---

# 44. Обязательные UX states

Каждая основная страница должна иметь:

```text
loading

error

empty

success
```

Например Deals:

```text
No deals yet.

Create your first opportunity
and start building your pipeline.

[ Create Deal ]
```

Не:

```text
[]
```

---

# 45. Responsive

Не надо строить полноценную mobile CRM.

Но обязательно:

```text
desktop >= 1280

tablet ~768

small screen
```

На маленьком экране Kanban может иметь horizontal scroll.

Это нормально.

---

# 46. MVP — обязательный scope

Вот здесь я бы поставил жёсткую границу.

### Authentication

```text
✓ Register

✓ Login

✓ Logout

✓ Protected routes

✓ current user
```

### CRM data

```text
✓ Companies CRUD

✓ Contacts CRUD

✓ Deals CRUD

✓ Tasks CRUD
```

### Pipeline

```text
✓ Kanban

✓ configurable stages через seed

✓ drag & drop

✓ reorder

✓ optimistic update

✓ rollback
```

### Deal

```text
✓ company

✓ contact

✓ owner

✓ value

✓ stage

✓ probability

✓ expected close date
```

### Search / filtering

```text
✓ deal search

✓ owner filter

✓ stage filter

✓ company search

✓ pagination
```

### Dashboard

```text
✓ open deals

✓ total pipeline value

✓ won this month

✓ win rate

✓ deals by stage
```

### Business logic

```text
✓ roles

✓ backend permissions

✓ activity log
```

### Quality

```text
✓ loading states

✓ error states

✓ empty states

✓ responsive

✓ Docker Compose

✓ migrations

✓ seed data

✓ README
```

**На этом MVP закончен.**

---

# 47. НЕ входит в MVP

Очень важно сознательно не делать:

```text
✗ WebSocket

✗ email integration

✗ Google Calendar

✗ notifications

✗ attachments

✗ comments

✗ custom fields

✗ custom pipelines

✗ dark mode

✗ Stripe

✗ OAuth

✗ AI

✗ CSV import

✗ CSV export

✗ Redis

✗ microservices

✗ Kubernetes
```

Даже если очень хочется.

---

# 48. Bonus 1 — WebSocket

Только после завершения MVP.

Например Socket.IO:

```text
deal.created
deal.updated
deal.moved
deal.deleted

task.created
task.updated
```

Scenario:

```text
Browser A

Proposal → Won

       ↓

WebSocket

       ↓

Browser B

карточка автоматически
переходит в Won
```

---

# 49. Bonus 2 — Notes

Можно добавить таблицу:

```text
notes

id
workspace_id
deal_id
author_id
content
created_at
```

Но только после MVP.

---

# 50. Bonus 3 — Charts

Dashboard:

```text
Pipeline Value by Stage

Deals Won by Month
```

Максимум 2 графика.

Нет необходимости строить BI dashboard.

---

# 51. Bonus 4 — Saved filters

Например:

```text
My Hot Deals

owner = me
value > 5000
probability > 60
```

Это хороший frontend bonus.

---

# 52. Тестирование

Не ставить цель:

```text
100% coverage
```

Проверить критические workflows.

Frontend unit/integration:

```text
LoginForm validation

DealForm validation

filter query params

Pipeline rendering

permissions UI

optimistic move rollback
```

Backend:

```text
login

unauthorized request

create company

create deal

update deal

move deal

permission checks
```

---

# 53. Один полноценный E2E

Если использовать Playwright:

```text
login

↓

open Deals

↓

create Company

↓

create Contact

↓

create Deal

↓

move Deal
New → Qualified

↓

create follow-up Task

↓

complete Task
```

Если этот сценарий работает — большая часть CRM работает.

---

# 54. Seed data

Обязательно.

После:

```bash
npm run seed
```

создаются:

```text
Workspace
Orbit Sales
```

Users:

```text
John Smith — OWNER

Maria Brown — MANAGER

Alex Green — SALES
```

Companies:

```text
15–20
```

Contacts:

```text
25–30
```

Deals:

```text
30–40
```

Tasks:

```text
15–20
```

Activities:

```text
50+
```

Pipeline должен выглядеть заполненным сразу после запуска проекта.

---

# 55. Demo account

Например:

```text
demo@leadflow.local
demo1234
```

Не использовать этот пароль где-либо кроме seed/demo.

---

# 56. Docker

Корневой проект:

```text
leadflow/

frontend/
backend/

docker-compose.yml

README.md
```

Services:

```yaml
services:

  frontend:

  backend:

  mysql:
```

Запуск:

```bash
docker compose up
```

В идеале после этого не требуется вручную устанавливать MySQL.

---

# 57. Environment

Например:

```text
backend/.env

PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
```

В Git:

```text
.env.example
```

Но:

```text
.env
```

не коммитить.

---

# 58. Database migrations

Не создавать schema вручную через MySQL Workbench.

Должно быть:

```bash
npm run migrate
```

и:

```bash
npm run seed
```

Можно использовать:

```text
Knex

Sequelize migrations

Prisma migrations
```

Если хочешь показать именно SQL/MySQL знания, я бы предпочёл **Knex или собственные SQL migrations**, а не скрывал всю БД за ORM.

---

# 59. План разработки — 8 недель

## Week 1 — Foundation

Backend:

```text
Express

MySQL connection

migrations

Docker

users

workspaces

JWT auth
```

Frontend:

```text
React

Router

Redux store

RTK Query

Login

Register

App Layout
```

**Definition of Done недели:**

Можно зарегистрироваться, войти и открыть protected page.

---

# Week 2 — Companies & Contacts

Backend:

```text
Companies CRUD

Contacts CRUD

pagination

search
```

Frontend:

```text
Companies table

Company form

Company detail

Contacts table

Contact form
```

DoD:

```text
создать Company

добавить Contact

отредактировать

найти через search
```

---

# Week 3 — Deals

Backend:

```text
Pipelines

Stages

Deals CRUD

filters
```

Frontend:

```text
Deal form

Deal detail

Deal cards
```

DoD:

Можно создать полноценную сделку и связать:

```text
Company
Contact
Owner
Stage
```

---

# Week 4 — Kanban

Главная техническая неделя.

```text
Pipeline UI

dnd-kit

move endpoint

ordering

optimistic update

rollback
```

DoD:

```text
Deal можно drag & drop

UI меняется моментально

refresh сохраняет состояние

server error откатывает UI
```

---

# Week 5 — Tasks + Activity

Backend:

```text
Tasks CRUD

Activity service

automatic activity logging
```

Frontend:

```text
Tasks page

Deal tasks

Activity timeline
```

DoD:

Из Deal можно создать follow-up task, а изменения Deal появляются в Activity.

---

# Week 6 — Dashboard + Permissions

```text
Dashboard queries

aggregations

OWNER / MANAGER / SALES

backend authorization
```

Frontend:

```text
Metric cards

stage statistics

permission-based UI
```

DoD:

SALES не может выполнять действия MANAGER даже через прямой API-запрос.

---

# Week 7 — Quality

Никаких крупных feature.

```text
validation

error handling

loading states

empty states

responsive

pagination polish

tests
```

Добавить E2E, если успеваешь.

---

# Week 8 — Portfolio polish

Вообще не добавлять business features.

Делать:

```text
fix bugs

seed data

demo account

README

screenshots

architecture diagram

ER diagram

deployment

clean commits

remove dead code
```

Это очень важная неделя.

---

# 60. Definition of Done всего проекта

Я бы считал проект готовым для CV только когда выполнено:

```text
✓ GitHub repository

✓ нормальный README

✓ frontend deployed

✓ backend deployed

✓ database deployed

✓ demo account

✓ seed data

✓ Docker Compose

✓ database migrations

✓ authentication

✓ authorization

✓ Companies CRUD

✓ Contacts CRUD

✓ Deals CRUD

✓ Tasks CRUD

✓ Pipeline

✓ drag & drop

✓ optimistic update

✓ filters

✓ pagination

✓ Dashboard

✓ Activity

✓ error/loading/empty states

✓ responsive UI

✓ хотя бы базовые tests
```

---

# 61. Что должно быть в README

README должен продавать проект не хуже самого UI.

Структура:

```text
LeadFlow CRM

Screenshot / GIF

Live Demo

Demo credentials

Features

Tech Stack

Architecture

Database Schema

API overview

RTK Query architecture

Optimistic updates

Permissions

Running locally

Docker

Testing

Technical decisions
```

Особенно рекомендую сделать раздел:

## Technical decisions

И написать своими словами:

```text
Почему server state находится в RTK Query,
а не в обычных Redux slices.

Как реализован optimistic drag & drop.

Как происходит rollback.

Почему filters синхронизированы с URL.

Как устроено разграничение workspace данных.

Почему permissions проверяет backend.

Почему Activity формирует backend.

Как хранится порядок Deal внутри Pipeline Stage.
```

Именно эти вещи превращают репозиторий из «я прошёл React tutorial» в проект, который удобно обсуждать на техническом интервью.

## Если времени окажется только 6 недель

Тогда я бы **не вырезал Kanban, RTK Query или optimistic updates** — это как раз самые ценные frontend-части.

Урезал бы:

```text
Dashboard charts
→ оставить только KPI

Tasks page
→ оставить tasks только внутри Deal

Activity
→ только Deal activity

Contacts page
→ оставить contacts через Company

advanced permissions
→ OWNER + MEMBER

tests
→ 5–8 критических + 1 E2E
```

Получится меньший продукт, но технически сильный.

В итоге ядро портфолио здесь не «CRM» как таковая. Ядро — это связка **React → Redux Toolkit → RTK Query → optimistic cache → REST → permissions → relational MySQL → Docker** на достаточно реалистичной бизнес-задаче. Именно на этом я бы строил проект и рассказ о нём на интервью.

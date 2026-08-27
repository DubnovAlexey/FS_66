## Для фронтэнд девелопера со стеком js-react-redux-rtk-mySQL-docker какое пробное задание было бы интересное делать за пару месяцев для портфолио при поиске работы?  


Для такого стека я бы делал не очередной **Todo / интернет-магазин / weather app**, а проект, который выглядит как небольшой реальный SaaS-продукт. За 1.5–2 месяца он должен показать работодателю не количество технологий, а то, что ты умеешь проектировать интерфейс, состояние приложения, API и данные как разработчик.


### Сильный вариант: Issue Tracker / Mini Jira

Например, система управления проектами для небольшой команды:

**Workspace → Projects → Board → Issues → Comments / Activity**

Пользователь регистрируется, создаёт workspace, приглашает участников, создаёт проект и таски. Таски можно таскать между колонками `Backlog → Todo → In Progress → Review → Done`.

Твой стек сюда ложится очень естественно:

`React → Redux Toolkit / RTK Query → REST API → Node/Express → MySQL → Docker`

Хотя Node/Express ты не указал — я бы обязательно добавил небольшой backend. Иначе MySQL и Docker в frontend-портфолио практически нечем содержательно продемонстрировать.

### Что именно реализовать

Я бы ограничил MVP примерно такими возможностями:

* регистрация/login + JWT;
* workspace и проекты;
* роли `Owner / Admin / Member`;
* Kanban board с drag & drop;
* создание/редактирование issue;
* priority, status, assignee, labels, due date;
* поиск и фильтрация;
* комментарии;
* activity history;
* optimistic update при перемещении карточки;
* pagination/infinite scroll;
* loading/error/empty states;
* responsive UI;
* RTK Query cache + invalidation;
* MySQL relations и migrations;
* Docker Compose для frontend/backend/MySQL.

Например, БД уже получится достаточно взрослая:

```text
users
  └── workspace_members
        └── workspaces
              └── projects
                    └── issues
                          ├── comments
                          ├── issue_labels
                          └── activity_log

issues
  ├── creator_id -> users
  ├── assignee_id -> users
  ├── project_id -> projects
  └── status
```

И это намного интереснее на собеседовании, чем показать 15 независимых компонентов.

### Где показать именно frontend-уровень

Особое внимание я бы уделил RTK/RTK Query. Например:

```text
authSlice
uiSlice
filtersSlice

RTK Query:
  getProjects
  getProject
  getIssues
  getIssue
  createIssue
  updateIssue
  moveIssue
  deleteIssue
  getComments
  addComment
```

Причём не просто делать после каждого mutation:

```js
refetch();
```

а показать нормальную работу с cache invalidation и optimistic updates.

Например, пользователь переносит карточку:

```text
Todo             In Progress
─────────────────────────────
Fix login   →    Fix login
Add search
```

UI должен измениться мгновенно, запрос уйти на сервер, а при ошибке состояние откатиться. Вот такая небольшая деталь на техническом интервью может дать больше материала для разговора, чем ещё пять страниц приложения.

### Добавь одну «фишку»

Не надо делать 30 функций. Сделай **одну технологически интересную вещь**.

Я бы выбрал real-time updates через WebSocket:

> Вася перенёс ISSUE-42 в Done → у Маши доска обновилась без refresh.

Тогда проект уже демонстрирует React + state management + REST + WebSocket + optimistic UI + backend + relational DB.

Другой хороший вариант — activity log:

```text
Activity

18:42  Alex moved DEV-21
       Todo → In Progress

18:38  Maria assigned DEV-18 to John

18:31  John commented on DEV-14
```

Это заставит тебя продумать и UI, и структуру БД, и API.

### Что я бы НЕ делал

Не стал бы пытаться за два месяца клонировать Jira целиком. Особенно можно выкинуть email notifications, OAuth, billing, сложные permissions, attachments/S3, полноценный rich-text editor и Kubernetes.

Гораздо лучше иметь **8 хорошо законченных возможностей**, чем 25 полуработающих.

### План на ~8 недель

**Недели 1–2:** архитектура, Docker, MySQL schema, auth, layout, routing.

**Недели 3–4:** projects, issues, CRUD, RTK Query, filters.

**Неделя 5:** Kanban + drag & drop + optimistic updates.

**Неделя 6:** comments, users, roles, activity.

**Неделя 7:** WebSocket, responsive UI, обработка ошибок, skeletons/empty states.

**Неделя 8:** tests, polishing, deploy, README, screenshots/demo.

И последняя неделя очень важна. Для поиска работы проект должен быть не просто кодом на GitHub, а чем-то, что человек может открыть.

Я бы стремился к такой презентации:

```text
TaskFlow
Team project management platform

[ Live Demo ] [ GitHub ]

React · Redux Toolkit · RTK Query
Node.js · MySQL · Docker

Demo:
demo@example.com
password: demo123
```

В README — architecture diagram, ER diagram БД, несколько GIF/screenshots, инструкция `docker compose up`, описание решений вроде optimistic updates и caching.

**Альтернативы**, если Jira тебе совсем не интересна: dashboard управления складом/заказами; система бронирования переговорных/коворкинга; CRM для небольшого бизнеса. Но для твоего конкретного стека **Mini Jira / Linear-подобный issue tracker я бы поставил на первое место**: там естественно раскрываются React, Redux/RTK Query, сложное состояние, MySQL relations и Docker, а на собеседовании из одного проекта можно получить десяток хороших технических вопросов.

===============================================


##  Ниже — ТЗ, которое выглядит как реальное тестовое задание, но при этом достаточно большое, чтобы стать полноценным portfolio-проектом.

## Проект: TaskFlow — командный issue tracker

Задача: создать веб-приложение для управления задачами небольшой команды, по духу ближе к Linear/Jira, но без попытки скопировать их целиком.

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

Дополнительно по желанию:

```text
WebSocket / Socket.IO
Vitest
React Testing Library
Playwright
```

## 1. Основной пользовательский сценарий

Пользователь:

```text
Регистрация
   ↓
Создание Workspace
   ↓
Создание Project
   ↓
Создание Issues
   ↓
Kanban board
   ↓
Assign / Priority / Labels
   ↓
Comments
   ↓
Activity history
```

Пример структуры приложения:

```text
Acme Workspace

Projects
├── Website
│   ├── DEV-1 Fix login
│   ├── DEV-2 Add search
│   └── DEV-3 Improve mobile layout
│
└── Mobile App
    ├── APP-1 Push notifications
    └── APP-2 Profile screen
```

## 2. Страницы приложения

### `/login`

Форма:

```text
Email
Password

[ Login ]

Don't have an account?
Register
```

Нужно реализовать validation, loading state и сообщения об ошибках.

### `/register`

```text
Name
Email
Password
Confirm password

[ Create account ]
```

После регистрации пользователь автоматически авторизуется.

### `/workspace/:workspaceId`

Главный экран workspace.

Sidebar:

```text
TaskFlow

ACME

Projects
+ New project

Website
Mobile App
Backend

────────────

Members
Settings

John Smith
Logout
```

Основная область показывает список проектов.

### `/project/:projectId/board`

Главный экран проекта.

```text
Website

[ Search issues... ]

[ Assignee ] [ Priority ] [ Label ]

Backlog       Todo          In Progress       Done
────────────────────────────────────────────────────

DEV-18        DEV-14        DEV-11             DEV-3
Fix auth      Add search    Mobile nav         Login

DEV-20        DEV-16
Footer        Filters
```

Карточки можно drag & drop между колонками.

### `/issue/:issueId`

Можно сделать как отдельную страницу или modal/drawer.

Например:

```text
DEV-42

Fix authentication redirect

Status
In Progress

Priority
High

Assignee
John Smith

Labels
frontend
bug

Description

When authentication expires the user
is redirected incorrectly...

Comments
────────────────────────

Alex
I reproduced this on Chrome.

John
Working on it.

[ Write a comment... ]
```

## 3. Модель Issue

Каждый issue имеет:

```js
{
  id,
  key: "DEV-42",
  title,
  description,

  status,
  priority,

  assigneeId,
  creatorId,

  projectId,

  createdAt,
  updatedAt
}
```

Статусы:

```text
BACKLOG
TODO
IN_PROGRESS
REVIEW
DONE
```

Priority:

```text
LOW
MEDIUM
HIGH
URGENT
```

## 4. MySQL schema

Минимальный набор таблиц:

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

```sql
projects

id
workspace_id
name
project_key
description
created_at
updated_at
```

Например:

```text
name: Website
project_key: WEB
```

И тогда задачи:

```text
WEB-1
WEB-2
WEB-3
```

Issues:

```sql
issues

id
project_id

number
title
description

status
priority

creator_id
assignee_id

position

created_at
updated_at
```

`position` пригодится для drag & drop.

Комментарии:

```sql
comments

id
issue_id
author_id
content
created_at
updated_at
```

Labels:

```sql
labels

id
project_id
name
```

Связь many-to-many:

```sql
issue_labels

issue_id
label_id
```

Activity log:

```sql
activities

id
issue_id
user_id
action
metadata
created_at
```

Например:

```json
{
  "action": "STATUS_CHANGED",
  "metadata": {
    "from": "TODO",
    "to": "IN_PROGRESS"
  }
}
```

## 5. REST API

Auth:

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Workspaces:

```http
GET    /api/workspaces
POST   /api/workspaces

GET    /api/workspaces/:id
PATCH  /api/workspaces/:id
DELETE /api/workspaces/:id
```

Members:

```http
GET    /api/workspaces/:id/members
POST   /api/workspaces/:id/members
DELETE /api/workspaces/:id/members/:userId
```

Projects:

```http
GET    /api/workspaces/:workspaceId/projects
POST   /api/workspaces/:workspaceId/projects

GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

Issues:

```http
GET    /api/projects/:projectId/issues
POST   /api/projects/:projectId/issues

GET    /api/issues/:id
PATCH  /api/issues/:id
DELETE /api/issues/:id
```

Для перемещения карточки можно сделать отдельный endpoint:

```http
PATCH /api/issues/:id/move
```

Body:

```json
{
  "status": "IN_PROGRESS",
  "position": 4
}
```

Комментарии:

```http
GET    /api/issues/:id/comments
POST   /api/issues/:id/comments
PATCH  /api/comments/:id
DELETE /api/comments/:id
```

Activity:

```http
GET /api/issues/:id/activity
```

## 6. Redux architecture

Не надо складывать API-данные в обычный Redux slice.

То есть я бы не делал:

```js
issuesSlice
projectsSlice
usersSlice
commentsSlice
```

Для серверного state лучше использовать **RTK Query**.

Например:

```text
Redux Store

├── authSlice
├── uiSlice
├── filtersSlice
│
└── api
    └── RTK Query
```

`authSlice`:

```js
{
  user: null,
  token: null
}
```

`uiSlice`:

```js
{
  sidebarOpen: true,
  issueModalOpen: false
}
```

`filtersSlice`:

```js
{
  search: '',
  assignee: null,
  priority: [],
  labels: []
}
```

А серверные данные:

```text
projects
issues
comments
members
activity
```

идут через RTK Query.

## 7. RTK Query API

Можно сделать один основной `apiSlice`:

```js
createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'Workspace',
    'Project',
    'Issue',
    'Comment',
    'Member'
  ],
  endpoints: ...
})
```

Например:

```js
getIssues
getIssue

createIssue
updateIssue
deleteIssue

moveIssue

getComments
addComment

getProjects
createProject
```

Это хорошее место показать, что ты понимаешь:

```text
providesTags
invalidatesTags
selectFromResult
transformResponse
onQueryStarted
```

## 8. Очень важная часть — optimistic updates

Перемещение issue должно ощущаться мгновенным.

Плохой вариант:

```text
drag card
↓
request
↓
loading
↓
refetch board
↓
card appears
```

Хороший:

```text
drag card
↓
UI обновился сразу
↓
PATCH /move
↓
success
```

Если сервер ответил ошибкой:

```text
optimistic update
↓
server error
↓
rollback
```

Это можно реализовать через:

```js
onQueryStarted
```

и:

```js
api.util.updateQueryData()
```

Именно такую штуку потом хорошо обсуждать на интервью.

## 9. Фильтры

Сделай комбинацию:

```text
Search
Assignee
Priority
Label
Status
```

Например:

```text
search: "login"
priority: HIGH
assignee: me
```

URL можно синхронизировать:

```text
/project/12/board?priority=high&assignee=me&q=login
```

Это хороший frontend-detail, потому что ссылкой на выбранное состояние можно поделиться.

## 10. Drag & Drop

Карточки должны перемещаться:

```text
между статусами

Todo
    ↓
In Progress
```

и внутри одной колонки:

```text
Task A
Task B
Task C

↓ drag

Task B
Task C
Task A
```

На backend сохраняются:

```text
status
position
```

Для React можно использовать библиотеку вроде `dnd-kit`.

## 11. Activity system

Каждое важное действие создаёт activity.

Например:

```text
18:43 Alex created DEV-42

18:45 Alex changed priority
      Medium → High

18:49 John changed status
      Todo → In Progress

18:52 John added comment
```

Backend сам создаёт activity records.

То есть frontend не отправляет:

```http
POST /activities
```

вручную.

Frontend отправляет:

```http
PATCH /issues/42
```

а backend понимает:

```text
status изменился

→ записать activity
```

Это демонстрирует уже нормальное разделение ответственности.

## 12. Permissions

Не надо делать сложную ACL-систему.

Хватит:

```text
OWNER
ADMIN
MEMBER
```

Например:

```text
OWNER
delete workspace
manage members
create projects

ADMIN
manage members
create projects

MEMBER
create/edit issues
comment
```

Backend обязательно проверяет права.

Не только frontend:

```js
if (user.role === 'ADMIN') {
   showButton()
}
```

потому что UI permissions ≠ security.

## 13. Real-time как bonus

Через Socket.IO:

```text
Client A

moves DEV-42
Todo → Done

        ↓

Backend

        ↓

Client B

board automatically updates
```

События:

```text
issue:created
issue:updated
issue:moved
issue:deleted
comment:created
```

Не стоит делать это в первую неделю. Это bonus после готового REST MVP.

## 14. Error states

Это очень недооценённая часть portfolio-проектов.

Нужно показать:

```text
loading
empty
error
success
unauthorized
forbidden
not found
```

Например:

```text
No issues yet

Create your first issue to start
tracking work.

[ Create issue ]
```

вместо просто пустого `<div>`.

## 15. Docker

Структура:

```text
taskflow/

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

В идеале запуск:

```bash
git clone ...
cd taskflow

docker compose up
```

И приложение работает.

Это очень хороший selling point в README.

## 16. Структура frontend

Например:

```text
src/

app/
    store.js
    router.jsx

features/
    auth/
    issues/
    projects/
    comments/

pages/
    LoginPage/
    RegisterPage/
    BoardPage/
    ProjectPage/
    SettingsPage/

components/
    IssueCard/
    IssueModal/
    Sidebar/
    BoardColumn/
    SearchInput/
    UserAvatar/

services/
    api.js

hooks/

utils/
```

Главное — не делать архитектуру ради архитектуры.

Если компонент используется только на `BoardPage`, его вполне нормально держать рядом с `BoardPage`, а не превращать всё в глобальные `components`.

## 17. Что протестировать

Не надо пытаться получить `100% coverage`.

Лучше 10–15 содержательных тестов.

Например:

```text
login validation

issue creation

issue filtering

permission checks

drag-and-drop update

optimistic rollback

API authorization

create issue endpoint

update issue endpoint
```

И один хороший E2E:

```text
User logs in
→ opens project
→ creates issue
→ moves it to In Progress
→ opens issue
→ adds comment
```

## 18. Что НЕ делать в MVP

Не нужны:

```text
billing
Stripe
Google login
GitHub login
email verification
file uploads
notifications
calendar
mobile app
Kubernetes
microservices
GraphQL
Redis
Kafka
```

Очень легко попасть в ловушку:

> «А ещё прикручу Kafka».

А через два месяца базовая форма создания issue всё ещё работает криво.

Для portfolio ценнее законченный продукт.

## 19. План на 8 недель

### Неделя 1

Backend foundation:

```text
Express
MySQL
Docker
migrations
users
auth
JWT
```

Frontend:

```text
React
routing
store
RTK Query baseApi
login/register
```

### Неделя 2

```text
Workspace
Members
Projects
Sidebar
App layout
```

### Неделя 3

Основной Issues CRUD:

```text
create
read
update
delete
```

Issue modal/page.

### Неделя 4

Kanban:

```text
statuses
columns
cards
drag & drop
position
```

### Неделя 5

RTK Query polish:

```text
cache
tags
optimistic update
rollback
filters
search
```

### Неделя 6

```text
comments
labels
assignee
activity log
permissions
```

### Неделя 7

Quality:

```text
responsive
loading states
error states
empty states
tests
```

Если всё готово:

```text
WebSocket
real-time updates
```

### Неделя 8

Только polish.

Не добавлять десять новых features.

Делать:

```text
bug fixes
UI consistency
README
demo account
seed data
screenshots
deploy
clean repository
```

## 20. Seed data

Очень советую сделать:

```bash
npm run seed
```

который создаёт demo workspace:

```text
Acme

Website Redesign
├── WEB-1 Improve navigation
├── WEB-2 Fix login redirect
├── WEB-3 Mobile header
├── WEB-4 Search component
├── WEB-5 Dashboard loading state
└── ...
```

Тогда рекрутер открывает приложение и сразу видит нормальный интерфейс.

А не:

```text
You don't have projects.

[Create project]
```

## 21. README

README — часть проекта.

Наверху:

```text
# TaskFlow

A collaborative project management application
built with React, Redux Toolkit, Node.js,
MySQL and Docker.

Live Demo
GitHub
```

Дальше:

```text
Screenshot

Features

Tech Stack

Architecture

Database Schema

Running locally

Docker

API

Testing

Technical decisions
```

Особенно хорош раздел:

```text
Technical decisions
```

Например:

> RTK Query was chosen for server-state management to avoid duplicating API state inside Redux slices.

> Issue movement uses optimistic updates so the board responds immediately to drag-and-drop interactions.

> Authorization is enforced by the backend rather than relying only on conditional rendering in the frontend.

Это уже позволяет интервьюеру задавать хорошие вопросы.

## 22. Что должно быть готово к моменту поиска работы

Я бы поставил такой Definition of Done:

```text
✓ публичный GitHub repository
✓ deployed frontend
✓ deployed backend
✓ real MySQL database
✓ demo account
✓ Docker Compose
✓ README
✓ screenshots
✓ responsive layout
✓ loading/error/empty states
✓ auth
✓ Kanban
✓ drag & drop
✓ RTK Query
✓ optimistic update
✓ filters
✓ comments
✓ permissions
✓ basic tests
```

А это bonus:

```text
+ WebSocket
+ activity log
+ E2E
+ CI/CD
```

И самое главное: **не пытайся сделать проект огромным**. Для junior/junior+ frontend-позиции гораздо сильнее выглядит небольшая система, где ты можешь объяснить каждое решение — почему RTK Query, как устроен cache, как реализован optimistic update, почему такие таблицы MySQL, где проходит граница frontend/backend, — чем огромный клон Jira из 50 незавершённых функций.

Если бы я делал этот проект именно для поиска первой/следующей frontend-работы, я бы распределил усилия примерно **70% frontend / 20% backend / 10% DevOps**, потому что backend здесь нужен прежде всего для того, чтобы frontend работал с реалистичной системой, а не чтобы превращать проект в backend-портфолио.


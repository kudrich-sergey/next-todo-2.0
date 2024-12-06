# 🔥 ToDo 2.0 

Это обновлённый проект [ToDo](https://todo-react-virid-kappa.vercel.app/). 
Решил сделать взамен первому, который был сделан еще в далеком 2023 году.

## 🛠 Технологии:
- **NextJS 14.2**
- **ReactJS 18**
- **TypeScript**
- **Next-Auth v5 (Auth.js)** (аутентификация)
- **TanStack Query v5** (управление данными)
- **Zustand** (управление состоянием)
- **Prisma** (ORM)
- **BcryptJS** (хэширование паролей)
- **@hello-pangea/dnd** (Drag & Drop)
- **React Hook Form** (работа с формами)
- **React Toastify** (уведомления)
- **Axios** (отправка запросов на API)
- **clsx** (работа с классами по условию)
- CSS-Modules / SCSS (стилизация)

# 💡 Запуск:

1. Клонировать репозиторий
2. Создать базу данных и отредактировать файл schema.prisma, изменив провайдер (при необходимости)
3. Переименовать файл .env.development в .env и отредактировать переменные
```bash
DATABASE_URL="postgresql://login:password@localhost:5432/todo?schema=public"
AUTH_SECRET=""
```
4. Выполнить:
```bash
# установка зависимостей
npm install
# заполнение базы данных
npx prisma db seed
# запуск сервера
npx next dev
```
5. Начать ознакомление
# 📬 Система обработки обращений

Проект представляет собой REST API для анонимной обработки обращений, реализованный на **Node.js**, **Express** и **TypeScript**.  
В качестве СУБД используется **Supabase (PostgreSQL)**, взаимодействие реализовано через официальный JS SDK. При необходимости проект легко адаптируется под обычный PostgreSQL с ORM (например, Prisma).
---

## 🚀 Возможности

Система поддерживает следующие функции:

- Создание обращения с темой и текстом
- Изменение статуса обращения:
    - Взять в работу
    - Завершить с текстом решения
    - Отменить с причиной отмены
- Получение списка всех обращений
    - Фильтрация по дате и диапазону дат
- Массовая отмена всех обращений со статусом "в работе"

---

## 🧱 Стек технологий

- **Node.js**
- **Express.js**
- **TypeScript**
- **Supabase** (PostgreSQL)
- **ts-node-dev** (горячий перезапуск)
- **dotenv** (хранение токенов)

---

## ⚙️ Установка и запуск

```bash
# Клонируем проект
git clone https://github.com/the-doctor-what/test-project
cd test-project

# Установка зависимостей
pnpm install

# Запуск в dev-режиме
pnpm run dev
```

🧩 Убедитесь, что у вас установлен pnpm. Если нет:

```
npm install -g pnpm
```

## 🌍 Конфигурация окружения
Создайте .env файл в корне проекта:

```
port=your-port
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_TOKEN=your-anon-or-service-role-key
```

## 🗄️ Структура таблицы appeals в Supabase
```sql
create table reports (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    title text not null,
    description text not null,
    status text default 'new',
    solution text,
    reason text,
);
```

## 📌 Список endpoint'ов системы обращений

| №  | Действие                                       | HTTP метод | URL                                      | Описание |
|----|------------------------------------------------|------------|-------------------------------------------|----------|
| 1  | Создать обращение                              | `GET`      | `/reports/create`                         | Отправить тему и текст обращения |
| 2  | Взять обращение в работу                       | `GET`      | `/reports/take`                           | Установить статус обращения как "в работе" |
| 3  | Завершить обращение                            | `GET`     | `/reports/complete`                       | Добавить решение и завершить обращение |
| 4  | Отменить обращение                             | `GET`     | `/reports/cancel`                         | Указать причину и отменить обращение |
| 5  | Получить список обращений по дате/диапазону    | `GET`      | `/reports?date=2025-04-17` или `/reports?from=2025-04-10&to=2025-04-17` | Фильтрация обращений по дате или периоду |
| 6  | Отменить все обращения со статусом "в работе"  | `GET`     | `/reports/cancelAllInProgress`            | Массовая отмена обращений |

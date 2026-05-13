# Frontend и сервер Myata Flowers

Короткая памятка: как локальный frontend получает данные, как правильно запускать проект и зачем нужен SSH-туннель.

## Как frontend получает данные

Frontend не подключается к MongoDB напрямую. Он получает букеты через HTTP API:

```text
https://api-v2.myata-flowers.ru/api/bouquets
```

В коде это задано в:

```text
src/store/slices/bouquetSlice.ts
```

Там используется:

```ts
const API = "https://api-v2.myata-flowers.ru/api/bouquets";
```

То есть цепочка такая:

```text
React frontend -> api-v2.myata-flowers.ru -> backend на сервере -> MongoDB на сервере
```

## Как запускать локально

Основная команда для локальной разработки:

```bash
npm run mob
```

Она запускает Vite с доступом по сети:

```text
Local:   http://localhost:5173/
Network: http://192.168.1.144:5173/
```

Лучше открывать именно сетевой адрес компьютера:

```text
http://192.168.1.144:5173/
```

Почему не обычный `localhost`: backend/CORS настроен так, что запросы с приватного IP компьютера разрешены, а обычный `http://localhost:5173` может блокироваться CORS.

Если IP компьютера изменился, после запуска `npm run mob` смотри строку `Network` в терминале и открывай актуальный адрес.

## Почему появляется CORS

Если открыть:

```text
http://localhost:5173/
```

может быть ошибка:

```text
No 'Access-Control-Allow-Origin' header is present
```

Это значит: браузер делает запрос с origin `http://localhost:5173`, а backend разрешает другой origin, например:

```text
http://192.168.1.144:5173
```

Решение: открыть frontend по `Network`-адресу из Vite.

## Нужен ли SSH-туннель для frontend

Для обычного frontend-запуска туннель к MongoDB не нужен.

Frontend работает через HTTP API:

```text
https://api-v2.myata-flowers.ru
```

Туннель нужен только если локально запускается backend, который сам должен подключиться к серверной MongoDB.

## SSH-туннель к MongoDB

Команда:

```bash
ssh tunnelbd
```

Она делает две вещи:

1. Открывает обычную SSH-консоль сервера.
2. Поднимает локальный проброс MongoDB:

```text
127.0.0.1:27017 на компьютере -> 127.0.0.1:27017 на сервере
```

Пока SSH-сессия открыта, локальный backend может подключаться к серверной базе так:

```text
mongodb://127.0.0.1:27017/myataFlowers
```

Закрыть туннель:

```bash
exit
```

## Запустить туннель в фоне

```bash
ssh -f tunnelbd
```

Проверить, что он поднялся:

```bash
ss -tulpn | grep 27017
```

Остановить фоновый туннель:

```bash
pkill -f 'ssh -f tunnelbd'
```

Если при запуске видишь:

```text
Address already in use
```

значит порт `27017` уже занят. Чаще всего туннель уже запущен в фоне.

## Типовой локальный запуск frontend

```bash
npm install
npm run mob
```

Открыть:

```text
http://192.168.1.144:5173/
```

Если адрес изменился, взять новый из строки `Network` в терминале Vite.

## Типовой локальный запуск backend с серверной базой

Открыть первый терминал:

```bash
ssh tunnelbd
```

Открыть второй терминал и запустить backend с Mongo URI:

```text
mongodb://127.0.0.1:27017/myataFlowers
```

Frontend при этом всё равно можно запускать через:

```bash
npm run mob
```

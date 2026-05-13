# Myata Flowers: приложение и сервер

Документ написан как рабочая памятка для начинающего DevOps/разработчика, который администрирует сервер Myata. Здесь собрана карта сервера, базовые команды, правила доступа, MongoDB, nginx, PM2, деплой фронтенда и рекомендации, чтобы VS Code Remote не съедал ресурсы.

Дата аудита: 2026-05-12.

## 1. Быстрый вход

Подключение к серверу:

```bash
ssh server
```

Сейчас алиас `server` ведет на сервер:

```text
host: 5028337-lv71854
public IPv4: 193.168.3.65
OS: Ubuntu 22.04.5 LTS
CPU: 4 cores
RAM: 7.8 GiB
disk: /dev/sda1, 79G, занято около 16%
```

Основные директории:

```text
/srv                         исходники и backend-проекты
/var/www                     статика сайтов и Next/Payload проекты
/etc/nginx                   nginx-конфиги
/var/lib/mongodb             данные MongoDB
/var/log                     системные логи
/root/.pm2                   PM2 процессы и логи
```

Главные команды диагностики:

```bash
uptime
free -h
df -hT
ss -tulpn
pm2 list
systemctl status nginx --no-pager
systemctl status mongod --no-pager
nginx -t
```

## 2. Что сейчас работает на сервере

### Системные сервисы

Запущены:

```text
nginx
mongod
pm2-root
docker
containerd
php8.1-fpm
ssh
zabbix-agent
certbot.timer
```

MongoDB слушает только localhost:

```text
127.0.0.1:27017
```

Это хорошо: база не открыта наружу.

Node/Next приложения слушают порты:

```text
3002  myata backend
5001  statistics-api
5002  demoBack/test-api
3000  cities-next
3003  admin-cms
3100  prodatvolosy/test Next
```

Важно: эти порты слушают на `*`, то есть технически доступны со всех интерфейсов. Лучше закрыть их firewall-ом и/или заставить приложения слушать `127.0.0.1`, а наружу отдавать только 80/443 через nginx.

## 3. Карта проектов

### Myata frontend

```text
source: /srv/frontend-myata
build:  /srv/frontend-myata/dist
prod:   /var/www/myata-flowers.ru
domain: myata-flowers.ru, www.myata-flowers.ru
type:   Vite SPA
```

Команды проекта:

```bash
cd /srv/frontend-myata
npm ci
npm run build
npm run lint
```

Публичная статика nginx отдает из:

```text
/var/www/myata-flowers.ru
```

### Myata backend

```text
path:     /srv/myata-beckend
pm2 name: myata-api
script:   /srv/myata-beckend/dist/index.js
port:     3002
db:       MongoDB, database myataFlowers
```

Команды:

```bash
cd /srv/myata-beckend
npm ci
npm run build
pm2 restart myata-api
pm2 logs myata-api --lines 100
```

### Statistics

```text
backend: /srv/statistics-api
pm2:     statistics-api
port:    5001
db:      flowerCRM

frontend source: /srv/statistics-frontend
frontend prod:   /var/www/statistics.myata-flowers.ru
```

### Cities / admin CMS

```text
cities-next:
  path: /var/www/cities-next
  pm2:  cities-next
  port: 3000

admin-cms:
  path: /var/www/Sites-admin-cms
  pm2:  admin-cms
  port: 3003
  db:   sites_admin_cms_dev
```

`admin-cms` похож на Payload/Next-проект. В MongoDB есть коллекции `payload-*`, `pages`, `media`, `users`, `tenants`, `blog-posts`.

### SmartJob / test projects

```text
/srv/smartJob/demoBack
  pm2: demo-back
  port: 5002

/srv/smartJob/prodatvolosy.test
  pm2: prodatvolosy
  port: 3100
```

### n8n

```text
path: /srv/n8n/docker-compose.yml
nginx domain: n8n.myata-flowers.ru
expected port: 5678
```

На момент аудита контейнер n8n не запущен, порт `5678` не слушает. Поэтому nginx для `n8n.myata-flowers.ru` будет отдавать 502, пока контейнер не поднят.

Запуск:

```bash
cd /srv/n8n
docker compose up -d
docker compose ps
```

## 4. PM2: как администрировать приложения

PM2 держит Node/Next процессы.

Посмотреть список:

```bash
pm2 list
```

Подробности процесса:

```bash
pm2 describe myata-api
```

Логи:

```bash
pm2 logs myata-api --lines 100
pm2 logs statistics-api --lines 100
pm2 logs admin-cms --lines 100
```

Перезапуск:

```bash
pm2 restart myata-api
```

Остановить:

```bash
pm2 stop myata-api
```

Запустить из ecosystem:

```bash
cd /srv/myata-beckend
pm2 start ecosystem.config.js
```

Сохранить текущий список процессов, чтобы он поднялся после reboot:

```bash
pm2 save
systemctl status pm2-root --no-pager
```

Смотреть нагрузку:

```bash
pm2 monit
```

Рекомендация: для Next-приложений тоже задать `max_memory_restart`, например `500M-800M`, чтобы процесс автоматически перезапускался при утечке памяти.

## 5. Правильный деплой фронтенда Myata

Безопасный порядок:

```bash
ssh server
cd /srv/frontend-myata
git status
git pull
npm ci
npm run build
```

Если build успешный, обновить продовую статику:

```bash
rsync -av --delete dist/ /var/www/myata-flowers.ru/
```

Проверить:

```bash
ls -lah /var/www/myata-flowers.ru
nginx -t
systemctl reload nginx
```

Если есть сомнения, перед `rsync --delete` сделать backup текущей статики:

```bash
mkdir -p /root/backups/www
tar -czf /root/backups/www/myata-flowers.ru-$(date +%F-%H%M).tar.gz /var/www/myata-flowers.ru
```

Важно: `npm run build` падает на TypeScript-ошибках. Например, неиспользуемый импорт ломает сборку. Это нормально: лучше поймать ошибку до выкладки.

## 6. Правильный деплой backend Myata

```bash
ssh server
cd /srv/myata-beckend
git status
git pull
npm ci
npm run build
pm2 restart myata-api
pm2 logs myata-api --lines 100
```

Проверить, что API слушает порт:

```bash
ss -tulpn | grep 3002
```

Проверить nginx:

```bash
nginx -t
systemctl reload nginx
```

## 7. MongoDB

### Текущая конфигурация

MongoDB:

```text
version: 7.0.31
config:  /etc/mongod.conf
data:    /var/lib/mongodb
log:     /var/log/mongodb/mongod.log
bindIp:  127.0.0.1
auth:    disabled
```

Плюс: MongoDB не торчит наружу.

Минус: авторизация выключена. Если злоумышленник получает доступ на сервер или в любое приложение с возможностью локального подключения, база открыта без логина/пароля.

### Локальный SSH-туннель к MongoDB

MongoDB на сервере не открыта наружу, поэтому локально к ней нужно подключаться через SSH-туннель.

На локальной машине настроен alias:

```bash
ssh tunnelbd
```

Что он делает:

```text
локально:  127.0.0.1:27017
сервер:    127.0.0.1:27017
```

То есть после запуска туннеля локальные приложения могут подключаться к серверной MongoDB так, как будто она запущена локально:

```text
mongodb://127.0.0.1:27017/myataFlowers
```

Для backend Myata:

```text
mongodb://127.0.0.1:27017/myataFlowers
```

Для статистики:

```text
mongodb://127.0.0.1:27017/flowerCRM
```

Запустить туннель и одновременно открыть обычную SSH-консоль сервера:

```bash
ssh tunnelbd
```

Пока эта SSH-сессия открыта, локальный порт `127.0.0.1:27017` ведет в серверную MongoDB. Закрыть SSH-сессию и туннель:

```text
exit
```

Запустить туннель в фоне:

```bash
ssh -f tunnelbd
```

Проверить, что локальный порт слушает SSH:

```bash
ss -tulpn | grep 27017
```

Остановить фоновый туннель:

```bash
pkill -f 'ssh -f tunnelbd'
```

Если локально уже запущена своя MongoDB на `27017`, туннель не поднимется. Тогда надо остановить локальную MongoDB или сделать отдельный alias на другой локальный порт, например `27018`.

### Найденные базы

```text
myata
  bouquets: 103

myataFlowers
  bouquets: 41
  myataFlowers-v2: 138

flowerCRM
  users: 863
  alldatas: 1276
  dailymetas: 34
  avitotokens: 1

sites_admin_cms_dev
  Payload/Next CMS коллекции: users, pages, media, tenants, blog-posts и payload-*

demo_blog
tasksTest
```

По PM2-конфигу Myata backend подключается к базе `myataFlowers`. Перед чисткой или миграцией обязательно проверить backend-модели, чтобы понять, какая коллекция реально используется приложением.

### Базовые команды MongoDB

Войти:

```bash
mongosh
```

Посмотреть базы:

```js
show dbs
```

Перейти в базу:

```js
use myataFlowers
```

Посмотреть коллекции:

```js
show collections
```

Посчитать документы:

```js
db.bouquets.countDocuments();
```

Посмотреть один документ без массовой выгрузки:

```js
db.bouquets.findOne();
```

### Backup MongoDB

Делать backup перед любыми изменениями:

```bash
mkdir -p /root/backups/mongo
mongodump --db myataFlowers --out /root/backups/mongo/$(date +%F-%H%M)
```

Архивировать:

```bash
tar -czf /root/backups/mongo/myataFlowers-$(date +%F-%H%M).tar.gz /root/backups/mongo/YYYY-MM-DD-HHMM
```

Восстановление:

```bash
mongorestore --db myataFlowers /root/backups/mongo/YYYY-MM-DD-HHMM/myataFlowers
```

### Как включать авторизацию MongoDB правильно

Не включать резко на проде без подготовки.

Порядок:

1. Сделать backup.
2. Создать пользователя MongoDB для приложения.
3. Обновить `MONGO_URI` в backend.
4. Проверить подключение backend.
5. Только потом включить `security.authorization: enabled`.
6. Перезапустить MongoDB и backend.

Пример:

```js
use myataFlowers
db.createUser({
  user: "myata_app",
  pwd: "strong-password-here",
  roles: [{ role: "readWrite", db: "myataFlowers" }]
})
```

После этого URI будет вида:

```text
mongodb://myata_app:strong-password-here@127.0.0.1:27017/myataFlowers?authSource=myataFlowers
```

## 8. Nginx

### Где лежат конфиги

```text
/etc/nginx/nginx.conf
/etc/nginx/sites-available/*
/etc/nginx/sites-enabled/*
```

Проверка:

```bash
nginx -t
```

Перезагрузка без остановки:

```bash
systemctl reload nginx
```

Полный статус:

```bash
systemctl status nginx --no-pager
```

### Текущая маршрутизация

```text
myata-flowers.ru
  root: /var/www/myata-flowers.ru
  SPA fallback: try_files $uri /index.html
  /api/ -> http://localhost:3002/api/

api-v2.myata-flowers.ru
  proxy -> http://localhost:3002

api.myata-flowers.ru
  proxy -> http://localhost:3001
  Внимание: порт 3001 сейчас не слушает, в логах nginx есть upstream errors.

statistics.myata-flowers.ru
  root: /var/www/statistics.myata-flowers.ru

statistics-api.myata-flowers.ru
  proxy -> http://localhost:5001

test-api.myata-flowers.ru
  proxy -> http://localhost:5002

test.myata-flowers.ru
  root: /var/www/test.myata-flowers.ru
  /api/ -> http://localhost:3002/api/

kzn.myata-flowers.ru, msk.myata-flowers.ru, general.myata-flowers.ru
  proxy -> http://127.0.0.1:3000

admin.myata-flowers.ru
  proxy -> http://127.0.0.1:3003

n8n.myata-flowers.ru
  proxy -> http://127.0.0.1:5678
  Внимание: n8n контейнер сейчас не запущен.
```

### Важные проблемы nginx

`nginx -t` сейчас успешный, но показывает предупреждение:

```text
conflicting server name "test.myata-flowers.ru" on 0.0.0.0:80, ignored
conflicting server name "test.myata-flowers.ru" on 0.0.0.0:443, ignored
```

Причина: в `/etc/nginx/sites-enabled/test.myata-flowers.ru` и `/etc/nginx/sites-enabled/prodatvolosy.ru` одновременно объявлен `server_name test.myata-flowers.ru`.

Что сделать:

1. Решить, кто должен владеть доменом `test.myata-flowers.ru`.
2. Если `prodatvolosy.ru` должен обслуживать свой домен, заменить там:

```nginx
server_name test.myata-flowers.ru;
```

на:

```nginx
server_name prodatvolosy.ru www.prodatvolosy.ru;
```

3. Выпустить сертификат:

```bash
certbot --nginx -d prodatvolosy.ru -d www.prodatvolosy.ru
```

4. Проверить и перезагрузить:

```bash
nginx -t
systemctl reload nginx
```

Если `prodatvolosy.ru` временно не нужен, можно отключить сайт:

```bash
rm /etc/nginx/sites-enabled/prodatvolosy.ru
nginx -t
systemctl reload nginx
```

Делать это только если точно понятно, что сайт не нужен в проде.

### Сертификаты

Certbot timer активен.

Проверить сертификаты:

```bash
certbot certificates
```

На момент аудита сертификат `test.myata-flowers.ru` просрочен. Перед обновлением нужно убрать конфликт `server_name`, затем:

```bash
certbot --nginx -d test.myata-flowers.ru
nginx -t
systemctl reload nginx
```

### Улучшения nginx

В `/etc/nginx/nginx.conf` сейчас включены старые TLS протоколы на глобальном уровне:

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
```

Лучше оставить:

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
```

Также лучше включить нормальные gzip-типы:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 5;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss image/svg+xml;
```

После любого изменения:

```bash
nginx -t
systemctl reload nginx
```

## 9. Доступы и безопасность

### Что сейчас

Сейчас сервер администрируется под `root`.

Активные SSH-настройки:

```text
PermitRootLogin yes
PasswordAuthentication yes
PubkeyAuthentication yes
Port 22
```

Проблемы:

```text
root login разрешен
парольный вход разрешен
UFW выключен
fail2ban выключен
все проекты и PM2 запущены от root
секреты лежат в ecosystem.config.js
в /root/.ssh есть приватный SSH-ключ
```

Это типичная картина для быстро поднятого сервера, но для продакшена ее лучше привести в порядок.

### Правильная схема доступа

Создать отдельного пользователя:

```bash
adduser deploy
usermod -aG sudo deploy
```

Добавить SSH-ключ:

```bash
mkdir -p /home/deploy/.ssh
nano /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Проверить вход в новом терминале:

```bash
ssh deploy@server
```

Только после успешной проверки отключать парольный root-доступ.

Открыть SSH config:

```bash
nano /etc/ssh/sshd_config
```

Рекомендованные настройки:

```text
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 60
ClientAliveCountMax 10
```

Проверить конфиг:

```bash
sshd -t
systemctl reload ssh
```

Важное правило: не закрывать текущую SSH-сессию, пока не проверен новый вход в отдельном терминале.

### Firewall

Сейчас `ufw` выключен. Минимальная схема:

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status verbose
```

Если нужен Zabbix agent на `10050`, открывать его только для IP мониторинга:

```bash
ufw allow from MONITORING_IP to any port 10050 proto tcp
```

Node-порты `3000`, `3002`, `3003`, `3100`, `5001`, `5002` наружу открывать не надо. Они должны быть доступны только nginx локально.

### Fail2ban

Установить:

```bash
apt update
apt install fail2ban
```

Минимальный jail:

```bash
nano /etc/fail2ban/jail.local
```

```ini
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 1h
findtime = 10m
```

Запустить:

```bash
systemctl enable --now fail2ban
fail2ban-client status sshd
```

### Секреты

Секреты не должны лежать в `ecosystem.config.js` и не должны коммититься.

Что сделать:

1. Создать `.env` в директории проекта.
2. Добавить `.env` в `.gitignore`.
3. В `ecosystem.config.js` оставить только безопасные настройки или читать env из файла.
4. Перевыпустить токены, которые уже хранились в открытом виде.

Минимальный пример:

```js
module.exports = {
  apps: [
    {
      name: "myata-api",
      script: "./dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
      },
    },
  ],
};
```

А секреты:

```text
MONGO_URI=...
JWT_SECRET=...
TELEGRAM_TOKEN=...
ADMIN_PASSWORD_HASH=...
```

хранить в `.env` с правами:

```bash
chmod 600 .env
```

## 10. Как сделать, чтобы VS Code Remote не ел CPU/RAM

### Почему он ест ресурсы

VS Code Remote ставит на сервер `.vscode-server`, запускает Node-процессы и file watcher. Если открыть весь `/srv` или `/`, watcher начинает обходить:

```text
node_modules
.next
dist
.git
logs
uploads
```

На сервере это быстро превращается в сотни мегабайт RAM и заметный CPU.

### Правильная привычка

Открывать в VS Code только конкретный проект:

```text
/srv/frontend-myata
```

или:

```text
/srv/myata-beckend
```

Не открывать весь:

```text
/srv
/
/var/www
```

### Настройки watcher

В проекте создать `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/.git/**": true,
    "**/node_modules/**": true,
    "**/.next/**": true,
    "**/dist/**": true,
    "**/build/**": true,
    "**/.cache/**": true,
    "**/coverage/**": true,
    "**/logs/**": true,
    "**/*.log": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  },
  "typescript.tsserver.maxTsServerMemory": 512
}
```

Для Next/Payload проектов особенно важно исключить `.next` и `node_modules`.

### Как проверить, что VS Code ест ресурсы

```bash
ps aux --sort=-%mem | head -20
ps aux --sort=-%cpu | head -20
```

Ищем процессы:

```text
/root/.vscode-server/...
fileWatcher
extensionHost
```

### Как аккуратно убить VS Code Remote

```bash
pkill -f '/root/.vscode-server'
```

Проверить:

```bash
ps aux | grep -E '[.]vscode-server|code-'
```

Если виден только `grep`, процессы убиты.

### Как снизить риск

1. Не работать на сервере через VS Code постоянно.
2. Для редких правок использовать `nano`/`vim` или деплоить через git.
3. Не запускать dev server на проде без необходимости.
4. Не открывать директории с несколькими проектами сразу.
5. Следить, чтобы VS Code не добавлял свои SSH-ключи без понимания.

## 11. Логи и чистка места

На момент аудита:

```text
/var/log/journal     около 712M
/var/log/mongodb     около 260M
/root/.pm2/logs      около 34M
/var/log/nginx       около 2.2M
```

Посмотреть размеры:

```bash
du -h --max-depth=1 /var/log /root/.pm2/logs 2>/dev/null | sort -h
journalctl --disk-usage
```

Ограничить journald:

```bash
nano /etc/systemd/journald.conf
```

Рекомендуемо:

```ini
SystemMaxUse=300M
RuntimeMaxUse=100M
MaxRetentionSec=14day
```

Применить:

```bash
systemctl restart systemd-journald
```

Разовая чистка journald:

```bash
journalctl --vacuum-time=14d
```

PM2 logrotate:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

Разово очистить PM2-логи:

```bash
pm2 flush
```

Осторожно: `pm2 flush` удалит текущие PM2-логи.

## 12. Обновления сервера

На момент аудита доступно около 45 обновлений пакетов.

Безопасный порядок:

```bash
apt update
apt list --upgradable
```

Дальше выбрать окно обслуживания и выполнить:

```bash
apt upgrade
```

После обновлений:

```bash
reboot
```

Перед reboot:

```bash
pm2 save
systemctl status pm2-root --no-pager
nginx -t
```

После reboot:

```bash
pm2 list
systemctl status nginx --no-pager
systemctl status mongod --no-pager
ss -tulpn
```

## 13. Swap

Swap сейчас отсутствует:

```text
Swap: 0B
```

Для обычной работы при 7.8 ГБ RAM это терпимо, но сборки Next/Payload могут резко съедать память. Лучше добавить 2 ГБ swap.

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

## 14. Backup

Перед любыми крупными изменениями сохранять:

```text
/etc/nginx
/srv/frontend-myata
/srv/myata-beckend
/var/www/myata-flowers.ru
/root/.pm2/dump.pm2
MongoDB dumps
.env файлы и секреты, но хранить их отдельно и безопасно
```

Пример backup nginx:

```bash
mkdir -p /root/backups/nginx
tar -czf /root/backups/nginx/nginx-$(date +%F-%H%M).tar.gz /etc/nginx
```

Пример backup сайта:

```bash
mkdir -p /root/backups/www
tar -czf /root/backups/www/myata-flowers.ru-$(date +%F-%H%M).tar.gz /var/www/myata-flowers.ru
```

Пример backup Mongo:

```bash
mkdir -p /root/backups/mongo
mongodump --out /root/backups/mongo/$(date +%F-%H%M)
```

## 15. Чек-лист регулярного обслуживания

Раз в неделю:

```bash
uptime
free -h
df -hT
pm2 list
systemctl status nginx --no-pager
systemctl status mongod --no-pager
nginx -t
certbot certificates
```

Раз в месяц:

```bash
apt update
apt list --upgradable
journalctl --disk-usage
du -h --max-depth=1 /var/log /srv /var/www | sort -h
```

Перед деплоем:

```bash
git status
npm ci
npm run build
```

После деплоя:

```bash
pm2 list
pm2 logs APP_NAME --lines 50
nginx -t
systemctl reload nginx
```

## 16. Приоритеты улучшений

1. Исправить nginx-конфликт `test.myata-flowers.ru`.
2. Обновить/перевыпустить просроченный сертификат `test.myata-flowers.ru`.
3. Закрыть прямой доступ к Node-портам через UFW.
4. Создать пользователя `deploy`, уйти от постоянной работы под `root`.
5. Отключить парольный SSH-вход после проверки ключей.
6. Включить fail2ban.
7. Перенести секреты из `ecosystem.config.js` в `.env` и перевыпустить токены.
8. Настроить PM2 logrotate.
9. Ограничить journald.
10. Добавить swap 2G.
11. Добавить `files.watcherExclude` для VS Code Remote.
12. Включить MongoDB authorization после backup и обновления `MONGO_URI`.

## 17. Главное правило

На сервере сначала проверить, потом менять.

Минимальный безопасный цикл:

```bash
git status
backup
изменение
nginx -t
npm run build
pm2 restart APP_NAME
pm2 logs APP_NAME --lines 100
```

Если команда удаляет, перезаписывает или меняет доступы, сначала понять, как откатиться.

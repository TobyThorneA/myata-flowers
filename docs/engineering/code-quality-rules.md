# Code Quality Rules

Дата: 2026-05-13.

Источник правил: соседний проект `../chat-frontend-2`.

## Что переносим сейчас

- `Prettier` как единый форматер.
- `prettier-plugin-tailwindcss` для автоматической сортировки Tailwind-классов.
- `eslint-plugin-simple-import-sort` для сортировки импортов и экспортов.
- `eslint-config-prettier`, чтобы ESLint не спорил с Prettier по форматированию.
- Скрипты `lint:fix`, `format`, `format:check`, `check`, `fix`, `prepare`.
- `lint-staged`: на коммите чинит только измененные JS/TS/TSX/CSS/SCSS/JSON/MD файлы.
- `husky`:
  - `pre-commit` запускает `lint-staged`;
  - `pre-push` запускает `npm run check` и `npm run build`.
- VS Code settings:
  - форматирование при сохранении;
  - ESLint fix on save;
  - Prettier как форматер для JS/TS/CSS/SCSS/JSON/MD.
- Правило проекта: обычный frontend-код пишем через стрелочные функции.
- `console.log` не используем; `console.warn` и `console.error` разрешены.
- Неиспользуемые переменные запрещены, кроме имен с `_`.

## Что адаптируем под Myata Flowers

- Не переносим `eslint-config-next`, потому что текущий проект пока Vite SPA.
- Не переносим правила для Next Server Actions и `proxy.ts`; они понадобятся только на этапе Next.js POC.
- Prettier запускаем отдельной командой, а не как ESLint-rule. Так проще читать ошибки: ESLint отвечает за код, Prettier за формат.
- Naming rules оставлены мягче, чем в `chat-frontend-2`, потому что текущий проект использует `const App = () => {}` + `export default App`, а не только `export const Component`.

## Что я бы добавил позже

- `eslint-plugin-jsx-a11y` для доступности кнопок, ссылок, форм и модалок.
- `commitlint`, когда появится новый репозиторий и договоренность о формате коммитов.
- Playwright smoke tests для сценариев: главная, каталог, букет, заявка, админ-логин.
- Bundle budget или analyzer, потому что текущий production chunk уже больше 500 kB.
- Отдельную проверку SEO-файлов: `robots.txt`, `sitemap.xml`, базовые meta.
- Регулярный `npm audit` как ручной чек перед релизами, но не автоматический `audit fix`.

## Команды

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run check
npm run fix
npm run build
```

## Рабочее правило

Сначала правила и автоматизация, потом миграция и редизайн. Если новое правило вскрывает старый долг, фиксируем его отдельным маленьким изменением, не смешивая с бизнес-фичами.

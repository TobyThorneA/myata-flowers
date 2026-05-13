# Content Model

Дата: 2026-05-13.

Цель документа: описать будущую модель данных Myata Flowers перед выбором CMS,
миграцией на Next.js и расширением SEO-страниц. Это не финальная схема базы данных,
а рабочий контракт: какие сущности нужны сайту, какие поля обязательны, что берем из
текущего API, а что нужно добавить.

## Зачем это нужно

Сейчас сайт уже умеет продавать букеты: есть каталог, карточки, избранное, акции,
форма заявки, отзывы и простая админка. Но текущая модель сделана вокруг быстрого
frontend-каталога, а не вокруг SEO, посадочных страниц, CMS и долгого развития.

Главная проблема: часть данных живет в backend, часть в коде, часть в статических
массивах. Для будущей архитектуры нужен единый язык данных:

- что такое букет;
- чем отличается категория от фильтра;
- как акция связана с букетами;
- где живут SEO-поля;
- какие страницы должны редактироваться без кода;
- какие URL попадают в sitemap;
- что нужно сохранить для обратной совместимости.

## Принципы модели

- Сначала модель, потом выбор CMS.
- Публичные URL строятся на стабильных `slug`, а не на русских названиях из API.
- Старые `_id` и текущие русские категории не удаляем сразу: они нужны для
  совместимости и редиректов.
- `hidden` и `available` не одно и то же: скрытый букет не показывается публично,
  недоступный может показываться как временно недоступный.
- Каждая индексируемая страница имеет SEO-поля и canonical URL.
- Изображения должны иметь `alt`, потому что это и доступность, и SEO, и нормальная
  админка.
- Client-only страницы вроде `/favorites` и `/order` не считаем SEO-контентом.
- Модель должна работать поэтапно: сначала в текущем Vite, потом в Next.js POC,
  потом в CMS/backend.

## Текущее состояние

Текущий основной тип букета находится в `src/pages/admin/types.ts`.

Сейчас `IBouquet` содержит:

- `_id`;
- `category`;
- `name`;
- `price`;
- `oldPrice`;
- `description`;
- `images`;
- `size`;
- `textSize`;
- `promotion`;
- `flowers`;
- `available`;
- `hidden`;
- `tags`;
- `categories`.

Этого хватает для текущего UI, но не хватает для будущих задач:

- нет `slug`;
- нет SEO-полей;
- нет canonical URL;
- нет `alt` у изображений;
- нет сортировки внутри категории;
- нет нормальных связей с посадочными страницами;
- нет дат публикации и обновления для sitemap;
- категории частично живут в коде, частично в backend;
- акции сейчас ближе к флагу внутри букета, чем к самостоятельной странице.

## Общие поля

Эти поля желательно иметь у всех публичных сущностей, которые могут попадать в URL
или sitemap.

```ts
type ContentStatus = "draft" | "active" | "hidden" | "archived";

type SeoFields = {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ContentImage;
  robots?: "index,follow" | "noindex,follow" | "noindex,nofollow";
};

type ContentImage = {
  url: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  position?: number;
  isPrimary?: boolean;
};
```

Общие поля сущностей:

- `id` - внутренний стабильный id;
- `legacyId` - текущий `_id` из backend, пока он нужен;
- `slug` - публичный URL-идентификатор;
- `status` - состояние публикации;
- `sortOrder` - ручная сортировка;
- `createdAt`;
- `updatedAt`;
- `publishedAt`;
- `seo`.

## Bouquet

`Bouquet` - главная коммерческая сущность. Она должна поддерживать текущий каталог,
карточку букета, SEO-страницу `/bouquet/[slug]`, подборки, акции и будущую CMS.

Минимальная целевая модель:

```ts
type Bouquet = {
  id: string;
  legacyId?: string;
  slug: string;
  status: ContentStatus;

  name: string;
  shortDescription?: string;
  description: string;

  price: number;
  oldPrice?: number;
  currency: "RUB";

  size?: string;
  textSize?: "маленький" | "средний" | "большой";
  flowers: BouquetFlower[];
  images: ContentImage[];

  categoryIds: string[];
  occasionIds?: string[];
  promotionIds?: string[];
  tags?: string[];

  available: boolean;
  hidden: boolean;
  sameDayDelivery?: boolean;
  featured?: boolean;
  sortOrder?: number;

  seo: SeoFields;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

type BouquetFlower = {
  type: string;
  sort?: string;
  color?: string;
  quantity: number;
};
```

Мост с текущим API:

| Сейчас        | Целевая модель              | Что делаем                                      |
| ------------- | --------------------------- | ----------------------------------------------- |
| `_id`         | `legacyId` и временно `id`  | Используем для старых URL и API-запросов        |
| `name`        | `name`                      | Оставляем                                       |
| нет           | `slug`                      | Добавить, генерировать из имени, редактировать  |
| `price`       | `price`                     | Оставляем                                       |
| `oldPrice`    | `oldPrice`                  | Оставляем                                       |
| `description` | `description`               | Оставляем, позже разделить на short/full        |
| `images[]`    | `images[]`                  | Расширить до объектов с `alt`                   |
| `flowers[]`   | `flowers[]`                 | Оставляем                                       |
| `categories`  | `categoryIds` через mapping | Нужен слой соответствия `apiKey -> categoryId`  |
| `category`    | deprecated                  | Не развивать, оставить только для совместимости |
| `promotion`   | `promotionIds`              | Вынести акции в отдельную сущность              |
| `available`   | `available`                 | Оставляем                                       |
| `hidden`      | `hidden` и `status`         | Синхронизировать осторожно                      |

Правила:

- `slug` должен быть уникальным.
- Если slug меняется, нужен редирект со старого slug.
- Старые `/bouquet/:id` должны открываться или редиректить на `/bouquet/:slug`.
- В sitemap попадают только активные, не скрытые букеты.
- Если `available = false`, страницу можно оставить индексируемой, но нужно явно
  показывать недоступность и давать альтернативы.

## Category

`Category` - не просто кнопка фильтра. Это SEO-страница `/catalog/[categorySlug]`,
навигационный элемент и связь с букетами.

```ts
type Category = {
  id: string;
  slug: string;
  apiKey: string;
  title: string;
  shortTitle?: string;
  description?: string;
  heroText?: string;
  status: ContentStatus;
  sortOrder: number;
  showOnHome?: boolean;
  showInMenu?: boolean;
  parentId?: string;
  seo: SeoFields;
};
```

Ключевое решение: `slug` и `apiKey` должны быть разными полями.

Пример:

```ts
{
  slug: "roses",
  apiKey: "Розы",
  title: "Розы"
}
```

Так мы не ломаем текущий backend, но получаем нормальные URL.

Стартовые категории:

| `slug`              | `apiKey`           | Название           |
| ------------------- | ------------------ | ------------------ |
| `roses`             | `Розы`             | Розы               |
| `chrysanthemums`    | `Хризантемы`       | Хризантемы         |
| `spray-roses`       | `Кустовые Розы`    | Кустовые розы      |
| `long-lasting`      | `Стойкие`          | Стойкие            |
| `seasonal`          | `Сезонные`         | Сезонные           |
| `author-bouquets`   | `Авторские букеты` | Авторские букеты   |
| `flower-boxes`      | `Композиции`       | Композиции         |
| `popular`           | `Популярное`       | Популярное         |
| `under-3000`        | computed/filter    | Букеты до 3000     |
| `under-5000`        | computed/filter    | Букеты до 5000     |
| `premium`           | computed/filter    | Премиальные букеты |
| `same-day-delivery` | computed/filter    | Доставка сегодня   |

Для computed-категорий нужен не `apiKey`, а правило фильтрации.

## Promotion

`Promotion` должна стать самостоятельной сущностью для `/promo` и `/promo/[slug]`.
Текущий `promotion` внутри букета можно оставить как технический флаг, но публичные
акции лучше описывать отдельно.

```ts
type Promotion = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: ContentStatus;
  type: "discount" | "free_delivery" | "delivery_discount" | "bundle" | "custom";
  startsAt?: string;
  endsAt?: string;
  bouquetIds?: string[];
  categoryIds?: string[];
  discountPercent?: number;
  discountAmount?: number;
  badgeText?: string;
  sortOrder?: number;
  seo: SeoFields;
};
```

Стартовые акции:

- `bouquet-of-day`;
- `week-deals`;
- `free-delivery`;
- `card-bundle`;
- `seasonal`.

Правила:

- Акция может быть страницей, бейджем на карточке или обоими вариантами.
- У акции должны быть даты активности, если она временная.
- Просроченные акции не должны попадать в sitemap.

## Occasion

`Occasion` - посадочные под намерение покупателя: день рождения, свидание, маме,
учителю, извинение, свадьба.

```ts
type Occasion = {
  id: string;
  slug: string;
  title: string;
  intent: string;
  description?: string;
  status: ContentStatus;
  bouquetIds?: string[];
  categoryIds?: string[];
  priceFrom?: number;
  priceTo?: number;
  faqIds?: string[];
  sortOrder?: number;
  seo: SeoFields;
};
```

Для MVP можно начать с 2-3 поводов:

- `birthday`;
- `date`;
- `mom`.

## LandingPage

`LandingPage` - универсальная модель для страниц, которые не являются букетом,
категорией или акцией: доставка, оплата, гарантии, о нас, контакты, рекламные
посадочные.

```ts
type LandingPage = {
  id: string;
  slug: string;
  path: string;
  title: string;
  status: ContentStatus;
  pageType: "delivery" | "payment" | "warranty" | "contacts" | "about" | "campaign" | "custom";
  blocks: LandingBlock[];
  faqIds?: string[];
  seo: SeoFields;
  updatedAt?: string;
};

type LandingBlock = {
  type: "text" | "hero" | "cta" | "image" | "faq" | "bouquet-list" | "contact-list";
  title?: string;
  text?: string;
  image?: ContentImage;
  bouquetIds?: string[];
  categoryIds?: string[];
};
```

На первом этапе блоки можно хранить не в CMS, а в typed config/JSON.

## SubscriptionPlan

`SubscriptionPlan` нужен для будущих страниц подписки на цветы.

```ts
type SubscriptionPlan = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: ContentStatus;
  priceFrom?: number;
  period: "weekly" | "twice_a_month" | "monthly" | "custom";
  target: "home" | "office" | "gift" | "custom";
  includes?: string[];
  sortOrder?: number;
  seo: SeoFields;
};
```

Для MVP достаточно одной страницы `/subscriptions` и нескольких тарифов в конфиге.

## CorporateOffer

`CorporateOffer` нужен для B2B: офисы, мероприятия, подарки сотрудникам и партнерам.

```ts
type CorporateOffer = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: ContentStatus;
  target:
    | "office_flowers"
    | "events"
    | "employee_gifts"
    | "partner_gifts"
    | "restaurants_hotels"
    | "custom";
  bouquetIds?: string[];
  examples?: ContentImage[];
  faqIds?: string[];
  seo: SeoFields;
};
```

Корпоративные страницы должны вести в отдельную B2B-заявку, а не только в форму
заказа конкретного букета.

## Review

Сейчас отзывы хранятся как статические картинки. Для будущей CMS лучше сделать
отдельную сущность.

```ts
type Review = {
  id: string;
  authorName?: string;
  source?: "site" | "yandex" | "flowwow" | "avito" | "manual";
  text?: string;
  rating?: number;
  image?: ContentImage;
  url?: string;
  status: ContentStatus;
  sortOrder?: number;
  publishedAt?: string;
};
```

На первом этапе можно оставить картинки, но добавить к ним `alt` и источник.

## FAQ

`FAQ` лучше сделать переиспользуемым: один вопрос может показываться на доставке,
категории, поводе или корпоративной странице.

```ts
type FaqItem = {
  id: string;
  question: string;
  answer: string;
  status: ContentStatus;
  pageTypes?: string[];
  sortOrder?: number;
};
```

FAQ пригодится для:

- `/delivery`;
- `/payment`;
- `/warranty`;
- `/catalog/[categorySlug]`;
- `/occasions/[occasionSlug]`;
- `/corporate`.

## OrderRequest

`OrderRequest` - заявка с текущей формы. Это не SEO-сущность, но ее нужно описать,
чтобы не потерять данные при переносе формы.

Текущие поля:

- `name`;
- `bouquetName`;
- `phone`;
- `contactMethod`;
- `kindOfFlowers`;
- `whomGifts`;
- `flowerDesign`;
- `honeypot`.

Целевая модель:

```ts
type OrderRequest = {
  id?: string;
  name: string;
  phone: string;
  contactMethod: "call" | "telegram" | "whatsapp" | "max";
  bouquetId?: string;
  bouquetName?: string;
  sourcePath?: string;
  comment?: string;
  kindOfFlowers?: string;
  whomGifts?: string;
  flowerDesign?: string;
  honeypot?: string;
  metrikaClientId?: string;
  createdAt?: string;
};
```

B2B-заявка должна быть отдельной:

```ts
type CorporateRequest = {
  id?: string;
  name: string;
  phone: string;
  company?: string;
  task: string;
  budget?: string;
  periodicity?: string;
  contactMethod: "call" | "telegram" | "whatsapp" | "max";
  sourcePath?: string;
  honeypot?: string;
  createdAt?: string;
};
```

## ContactSettings

Контакты лучше хранить как настройки сайта, а не размазывать по компонентам.

```ts
type ContactSettings = {
  phone: string;
  telegramUrl?: string;
  whatsappUrl?: string;
  maxUrl?: string;
  city?: string;
  address?: string;
  workingHours?: string;
  deliveryText?: string;
  socialLinks?: {
    title: string;
    url: string;
  }[];
};
```

Это особенно важно для CMS: владелец должен менять телефон, мессенджеры и часы
работы без правки кода.

## Redirect

Редиректы нужны для сохранения старых URL при переходе на slug и Next.js.

```ts
type RedirectRule = {
  from: string;
  to: string;
  statusCode: 301 | 302 | 307 | 308;
  reason?: string;
  active: boolean;
};
```

Обязательные правила:

- `/store` -> `/`;
- `/catalog/Розы` -> `/catalog/roses`;
- `/catalog/Хризантемы` -> `/catalog/chrysanthemums`;
- `/catalog/Стойкие` -> `/catalog/long-lasting`;
- `/catalog/Авторские%20букеты` -> `/catalog/author-bouquets`;
- `/specialOffer` -> `/promo`;
- `/bouquet/:id` -> `/bouquet/:slug`, когда появятся slug.

## AnalyticsGoal

Цели Метрики должны пережить миграцию.

```ts
type AnalyticsGoal = {
  id: string;
  name: string;
  event: string;
  params?: Record<string, string | number | boolean>;
  active: boolean;
};
```

Текущие важные цели:

- `click_order_button`;
- `bouquet_view`;
- `form_submit_call`;
- `form_submit_telegram`;
- `form_submit_whatsapp`;
- `form_submit_max`;
- `click_promo`;
- `click_bouquet_day`;
- `click_fast_delivery`.

## Что нужно редактировать в CMS

MVP для CMS или будущей админки:

1. Букеты:
   - название;
   - slug;
   - цена;
   - старая цена;
   - описание;
   - изображения и alt;
   - состав;
   - категории;
   - наличие;
   - скрытость;
   - сортировка;
   - SEO-поля.

2. Категории:
   - slug;
   - `apiKey`;
   - название;
   - описание;
   - видимость на главной и в меню;
   - SEO-поля;
   - сортировка.

3. Акции:
   - slug;
   - название;
   - даты активности;
   - связанные букеты/категории;
   - бейдж;
   - SEO-поля.

4. Служебные страницы:
   - доставка;
   - оплата;
   - гарантии;
   - контакты;
   - о нас.

5. Отзывы и FAQ.

Не обязательно тащить в CMS на первом шаге:

- избранное;
- локальное состояние модалок;
- маршруты админки;
- технические настройки сборки;
- временные UI-конфиги.

## Этапы внедрения

### Этап 1. Текущий Vite без изменения backend

- Завести typed config для категорий со `slug`, `apiKey`, `title`, `seo`.
- Добавить helper для поиска категории по slug и по apiKey.
- Не ломать текущие `/catalog/:category` с русскими названиями.
- Подготовить mapping старых URL на будущие URL.
- Оставить букеты в текущем API.

### Этап 2. Расширить frontend-слой данных

- Добавить адаптер `IBouquet -> BouquetViewModel`.
- В адаптере временно генерировать slug из имени или `_id`.
- Добавить alt для изображений хотя бы по шаблону: `<Название букета> - фото 1`.
- Спрятать знание текущего API за единым data layer.
- Подготовить sitemap-источник из категорий и букетов.

### Этап 3. Обновить backend или подключить CMS

- Добавить `slug` для букетов.
- Добавить SEO-поля.
- Заменить `images: string[]` на расширенную модель или отдельную таблицу/коллекцию.
- Категории вынести из кода в управляемый источник.
- Акции сделать отдельной сущностью.

### Этап 4. Next.js POC

- Реализовать `/catalog/[categorySlug]`.
- Реализовать `/bouquet/[slug]` или временно `/bouquet/[id]`.
- Подключить metadata.
- Проверить sitemap.
- Сохранить цели Метрики.
- Проверить редиректы.

## Рекомендуемый следующий технический шаг

Перед выбором CMS лучше сделать маленький frontend-шаг в текущем проекте:

```text
src/shared/categories/config/catalogCategories.ts
src/shared/categories/lib/getCategoryBySlug.ts
src/shared/categories/lib/getCategoryByApiKey.ts
```

В этот слой перенести текущие категории и добавить `slug`/SEO. Это даст быстрый
выигрыш без backend-риска и станет первым реальным куском будущей модели.

## Открытые вопросы

- Какие категории реально есть в backend прямо сейчас и какие из них продают лучше?
- Нужны ли отдельные варианты букета по размеру или текущего `textSize` достаточно?
- Должны ли быть дополнения к букету: открытка, коробка, шар, сладости?
- Нужна ли зона доставки с районами, сроками и ценами?
- Будет ли один город или несколько городов?
- Кто будет редактировать тексты: разработчик, владелец, флорист, маркетолог?
- Нужна ли история цен и акций?
- Нужны ли остатки/склад или достаточно ручного `available`?

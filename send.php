<?php

// Секретный токен и чат ID
$telegram_token = '7883440050:AAFjOUgdwQktiD0U3PDkDQa8iowtj9CJhpY';
$chat_id = '7911798658';

// Получаем JSON из запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверка на пустой запрос
if (!$data || !isset($data['name']) || !isset($data['phone'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Некорректные данные']);
    exit;
}

// Безопасность — очищаем входные данные
$name = htmlspecialchars($data['name']);
$phone = htmlspecialchars($data['phone']);

// Готовим сообщение
$message = "📩 Новая заявка:\nИмя: $name\nТелефон: $phone";

// Формируем URL Telegram API
$url = "https://api.telegram.org/bot$telegram_token/sendMessage";

// Отправляем запрос
$response = file_get_contents($url . "?chat_id=$chat_id&text=" . urlencode($message));

// Ответ клиенту
echo json_encode(['status' => 'ok']);

<?php

$telegram_token = '7883440050:AAFjOUgdwQktiD0U3PDkDQa8iowtj9CJhpY';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['chat_id']) || !isset($data['text'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Некорректные данные']);
    exit;
}

$chat_id = htmlspecialchars($data['chat_id']);
$text = htmlspecialchars($data['text']);
$parse_mode = isset($data['parse_mode']) ? $data['parse_mode'] : 'HTML';

$url = "https://api.telegram.org/bot$telegram_token/sendMessage?chat_id=$chat_id&text=" . urlencode($text) . "&parse_mode=" . urlencode($parse_mode);

$response = file_get_contents($url);

echo json_encode(['status' => 'ok']);


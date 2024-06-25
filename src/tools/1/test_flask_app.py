import unittest
from flask import json
from flask_testing import TestCase
from app import app, model  # Імпортуємо Flask додаток і модель для тестування
import urllib.parse  # Імпортуємо urllib.parse для кодування URL

# Клас для тестування нашого Flask додатку
class TestFlaskApp(TestCase):

    # Метод для створення екземпляру нашого Flask додатку для тестування
    def create_app(self):
        """Створює Flask додаток з увімкненим режимом тестування."""
        app.config['TESTING'] = True
        return app

    # Тестуємо головну сторінку нашого Flask додатку
    def test_index(self):
        """Перевіряємо, що головна сторінка відповідає очікуваному."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), "Flask server is running!")

    # Тестуємо передбачення з коректною URL
    def test_predict_valid_url(self):
        """Перевіряємо, що передбачення працює з коректною URL."""
        response = self.client.post('/predict', data=json.dumps({"text": "http://example.com"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('label', data)
        self.assertIn('probability', data)
        self.assertIn('FAKE', data['probability'])
        self.assertIn('REAL', data['probability'])

    # Тестуємо передбачення з некоректною URL
    def test_predict_invalid_url(self):
        """Перевіряємо, що передбачення правильно обробляє некоректну URL."""
        response = self.client.post('/predict', data=json.dumps({"text": "invalid_url"}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Invalid URL')

    # Тестуємо передбачення без тексту
    def test_predict_no_text(self):
        """Перевіряємо, що передбачення повертає помилку, якщо не вказаний текст."""
        response = self.client.post('/predict', data=json.dumps({}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'No text provided')

    # Тестуємо передбачення з порожнім текстом
    def test_predict_empty_text(self):
        """Перевіряємо, що передбачення повертає помилку, якщо текст є порожнім."""
        response = self.client.post('/predict', data=json.dumps({"text": ""}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'No text provided')

    # Тестуємо передбачення з URL, що містить спеціальні символи
    def test_predict_with_special_characters(self):
        """Перевіряємо, що передбачення правильно обробляє URL зі спеціальними символами."""
        special_url = "http://example.com/with-special-characters"
        encoded_url = urllib.parse.quote(special_url)
        response = self.client.post('/predict', data=json.dumps({"text": encoded_url}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Invalid URL')

if __name__ == '__main__':
    unittest.main()  # Запускаємо всі тести при запуску файлу

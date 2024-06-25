import json
import logging
import os
import pickle
import urllib
from urllib.parse import urlparse

from flask import Flask, request, jsonify
from flask_cors import CORS
from newspaper import Article, ArticleException

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pre-trained model
with open('./src/tools/1/modelv2.pickle', 'rb') as handle:
    model = pickle.load(handle)

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Check if 'text' field exists and is not empty
        if 'text' not in data or not data['text'].strip():
            return jsonify({'error': 'No text provided'}), 400

        url = data['text'].strip()

        # Validate URL
        parsed_url = urlparse(url)
        if not all([parsed_url.scheme, parsed_url.netloc]):
            return jsonify({'error': 'Invalid URL'}), 400

        # Download and parse the article
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()

        # Extract key sentences (summary)
        article_summary = article.summary

        # Predict using the model
        pred_proba = model.predict_proba([article.text])[0]
        pred_label = model.predict([article.text])[0]

        # Prepare response
        result = {
            'url': url,
            'title': article.title,
            'publish_date': article.publish_date.isoformat() if article.publish_date else None,
            'top_image': article.top_image,
            'keywords': article.keywords,
            'summary': article_summary,  # Using key sentences instead of full text
            'label': pred_label,
            'probability': {
                'FAKE': round(pred_proba[0] * 100, 2),
                'REAL': round(pred_proba[1] * 100, 2)
            },
            'confidence': {
                'FAKE': float(pred_proba[0]),
                'REAL': float(pred_proba[1])
            }
        }

        return jsonify(result)

    except ArticleException as e:
        logging.error(f'ArticleException in /predict endpoint: {str(e)}')
        return jsonify({'error': 'Failed to parse article'}), 500

    except urllib.error.HTTPError as e:
        logging.error(f'HTTPError in /predict endpoint: {str(e)}')
        return jsonify({'error': 'Failed to download article: HTTPError'}), 500

    except ValueError as e:
        logging.error(f'ValueError in /predict endpoint: {str(e)}')
        return jsonify({'error': 'Invalid URL or article content'}), 500

    except Exception as e:
        logging.error(f'Error in /predict endpoint: {str(e)}')
        return jsonify({'error': 'Unexpected error occurred'}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True, use_reloader=False)

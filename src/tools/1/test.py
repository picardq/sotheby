import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import itertools as iter
import pickle

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve, precision_recall_curve
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder

# Завантаження і підготовка даних
news = pd.read_csv("./src/tools/1/Datasets/fake_or_real_news.csv")
X = news['text']
y = news['label']

# Перетворення міток на числові значення
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Розділення даних на тренувальний і тестовий набори
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Створення пайплайна, що включає TF-IDF векторизацію і Multinomial Naive Bayes класифікатор
pipeline = Pipeline([('tfidf', TfidfVectorizer(stop_words='english')),
                     ('nbmodel', MultinomialNB())])

# Тренування моделі
pipeline.fit(X_train, y_train)

# Передбачення міток для тестових даних
pred = pipeline.predict(X_test)
pred_proba = pipeline.predict_proba(X_test)[:, 1]

# Оцінка моделі
report = classification_report(y_test, pred, output_dict=True)
print("Classification Report")
print(classification_report(y_test, pred))

print("Confusion Matrix Value")
cnf_matrix = confusion_matrix(y_test, pred)
print(cnf_matrix)

# Функція для візуалізації матриці плутанини
def plot_confusion_matrix(cm, classes,
                          normalize=False,
                          title='Confusion matrix',
                          cmap=plt.cm.Blues):
    """
    Ця функція виводить і візуалізує матрицю плутанини.
    Нормалізація може бути застосована шляхом встановлення `normalize=True`.
    """
    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        print("Normalized confusion matrix")
    else:
        print('Confusion matrix, without normalization')

    print(cm)

    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(len(classes))
    plt.xticks(tick_marks, classes, rotation=45)
    plt.yticks(tick_marks, classes)

    fmt = '.2f' if normalize else 'd'
    thresh = cm.max() / 2.
    for i, j in iter.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.tight_layout()

# Візуалізація матриці плутанини
plt.figure(figsize=(10, 7))
sns.heatmap(pd.DataFrame(cnf_matrix, index=['Fake', 'Real'], columns=['Fake', 'Real']), annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()

# Візуалізація ненормалізованої матриці плутанини
plt.figure(figsize=(10, 7))
plot_confusion_matrix(cnf_matrix, classes=['Fake', 'Real'], title='Confusion matrix, without normalization')

# Обчислення та візуалізація ROC-AUC
roc_auc = roc_auc_score(y_test, pred_proba)
fpr, tpr, _ = roc_curve(y_test, pred_proba)

plt.figure(figsize=(10, 7))
plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='gray', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.show()

print(f"ROC-AUC Score: {roc_auc:.4f}")

# Візуалізація класифікаційного звіту
def plot_classification_report(report):
    metrics = ['precision', 'recall', 'f1-score']
    classes = [0, 1]  
    class_names = ['FAKE', 'REAL']  
    scores = [report[str(cls)][metric] for cls in classes for metric in metrics]
    labels = [f"{class_names[cls]} {metric}" for cls in classes for metric in metrics]
    
    plt.figure(figsize=(12, 6))
    plt.barh(labels, scores, color=['skyblue', 'lightcoral', 'lightgreen'] * 2)
    plt.xlabel('Score')
    plt.title('Classification Report')
    plt.xlim(0, 1)
    plt.show()

    accuracy = report['accuracy']
    plt.figure(figsize=(6, 3))
    plt.barh(['Accuracy'], [accuracy], color='purple')
    plt.xlim(0, 1)
    plt.xlabel('Score')
    plt.title('Model Accuracy')
    plt.show()

plot_classification_report(report)

# Візуалізація precision-recall кривої
precision, recall, _ = precision_recall_curve(y_test, pred_proba)

plt.figure(figsize=(10, 7))
plt.plot(recall, precision, color='blue', lw=2)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.show()

# Візуалізація розподілу передбачених міток
plt.figure(figsize=(10, 7))
sns.histplot(pred, kde=False, color='blue', bins=3)
plt.title('Distribution of Predicted Labels')
plt.xlabel('Labels')
plt.ylabel('Frequency')
plt.xticks([0, 1], ['Fake', 'Real'])
plt.show()

# Візуалізація розподілу реальних міток
plt.figure(figsize=(10, 7))
sns.histplot(y_test, kde=False, color='green', bins=3)
plt.title('Distribution of Actual Labels')
plt.xlabel('Labels')
plt.ylabel('Frequency')
plt.xticks([0, 1], ['Fake', 'Real'])
plt.show()

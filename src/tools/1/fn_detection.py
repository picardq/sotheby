import pandas as pd                   
import numpy as np                    
import matplotlib.pyplot as plt      
import seaborn as sns                 
import itertools as iter             
import pickle                         

from sklearn.model_selection import train_test_split    
from sklearn.feature_extraction.text import TfidfVectorizer  
from sklearn.naive_bayes import MultinomialNB           
from sklearn.metrics import classification_report, confusion_matrix  
from sklearn.pipeline import Pipeline    

# Завантаження і підготовка даних
news = pd.read_csv("./src/tools/1/Datasets/fake_or_real_news.csv")
X = news['text']
y = news['label']

# Розділення даних на тренувальний і тестовий набори
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Створення пайплайна, що включає TF-IDF векторизацію і Multinomial Naive Bayes класифікатор
pipeline = Pipeline([('tfidf', TfidfVectorizer(stop_words='english')),
                     ('nbmodel', MultinomialNB())])

# Тренування моделі
pipeline.fit(X_train, y_train)

# Передбачення міток для тестових даних
pred = pipeline.predict(X_test)

# Оцінка моделі
print("Classification Report")
print(classification_report(y_test, pred))

print("Confusion Matrix Value")
array = confusion_matrix(y_test, pred)
print(array)

# Візуалізація матриці плутанини
df_cm = pd.DataFrame(array, index = [i for i in "AB"],
                     columns = [i for i in "AB"])
plt.figure(figsize = (10,7))
sns.heatmap(df_cm, annot=True)

# Збереження моделі у файл
with open('modelv2.pickle', 'wb') as handle:
    pickle.dump(pipeline, handle, protocol=pickle.HIGHEST_PROTOCOL)

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

# Обчислення матриці плутанини
cnf_matrix = confusion_matrix(y_test, pred)
np.set_printoptions(precision=2)

# Візуалізація ненормалізованої матриці плутанини
plt.figure(figsize = (10,7))
plot_confusion_matrix(cnf_matrix, classes=['Fake','Real'],
                      title='Confusion matrix, without normalization')

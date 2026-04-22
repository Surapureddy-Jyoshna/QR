import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

data = pd.read_csv("attendance_ml_dataset.csv")

X = data[["current_attendance","total_classes","attended"]]
y = data["needed_classes"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print("Model accuracy:", accuracy)

joblib.dump(model, "attendance_model.pkl")
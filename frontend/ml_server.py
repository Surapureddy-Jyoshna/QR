from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("attendance_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    df = pd.DataFrame([{
        "current_attendance": data["current"],
        "total_classes": data["total"],
        "attended": data["attended"]
    }])

    pred = model.predict(df)[0]

    return jsonify({
        "needed": max(0, round(pred))
    })

app.run(port=5001)
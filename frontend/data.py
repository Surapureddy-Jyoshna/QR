import pandas as pd
import random
import math

data = []

for _ in range(5000):

    total = random.randint(10, 200)
    attended = random.randint(0, total)

    current = (attended / total) * 100

    needed = math.ceil((0.75 * total - attended) / 0.25)
    if needed < 0:
        needed = 0

    data.append([current, total, attended, needed])

df = pd.DataFrame(data, columns=[
    "current_attendance",
    "total_classes",
    "attended",
    "needed_classes"
])

df.to_csv("attendance_ml_dataset.csv", index=False)

print("Dataset generated!")
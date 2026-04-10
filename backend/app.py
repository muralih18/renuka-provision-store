from flask import Flask, request, jsonify
from flask_cors import CORS
from openpyxl import Workbook
import smtplib
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)

@app.route("/order", methods=["POST"])
def order():
    data = request.json

    name = data["name"]
    phone = data["phone"]
    items = data["items"]

    # Create Excel
    wb = Workbook()
    ws = wb.active
    ws.append(["Item", "Quantity"])

    for item, qty in items.items():
        ws.append([item, qty])

    file_name = "order.xlsx"
    wb.save(file_name)

    # Send Email
    msg = EmailMessage()
    msg["Subject"] = "New Order - Renuka Provision Store"
    msg["From"] = "yourgmail@gmail.com"
    msg["To"] = "muralihyr2001@gmail.com"   # change later

    msg.set_content(f"Customer Name: {name}\nPhone: {phone}")

    with open(file_name, "rb") as f:
        msg.add_attachment(f.read(), maintype="application", subtype="octet-stream", filename=file_name)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login("muralihyr2001@gmail.com", "nfprsgnsmegyqhpm")
    server.send_message(msg)
    server.quit()

    return jsonify({"message": "Order sent successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
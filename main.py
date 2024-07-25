from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
import threading
import eel
import time

app = Flask(__name__)

# Initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}})

eel.init('web')

def getIp():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        address = s.getsockname()[0]
        s.close()
        return address
    except Exception as e:
        return str(e)

def createMessage(title, content, sender):
    eel.createMessage(title, content, sender)

def setServerState(state, stateCrit):
    eel.setServerState(state, stateCrit)

@eel.expose
def callMeBack():
    return True

@app.route('/create_message', methods=['GET'])
def create_message():
    title = request.args.get('title')
    content = request.args.get('content')
    sender = request.args.get('sender')

    if title and content and sender:
        createMessage(title, content, sender)
        return jsonify({"status": "success", "message": "Message created"})
    else:
        setServerState("Get mit fehlenden Parametern erhalten", "medium")
        return jsonify({"status": "failure", "message": "Missing parameters"}), 400

def start_flask():
    app.run(host='0.0.0.0', port=5000)

threading.Thread(target=start_flask).start()

eel.start('index.html', cmdline_args=['--kiosk'], block=False)

time.sleep(10)

# Wilkommens Nachricht
createMessage("Willkommen in der Welt der Informatik bei der Suva!", "Wir freuen uns, euch auf eurem spannenden Weg in der Informatik zu begleiten. Viel Erfolg und Spass!", "Das Suva-IF-Team")

while True:
    eel.sleep(5)
    setServerState("Backend-Service aktiv: " + getIp() + ":5000", "low")

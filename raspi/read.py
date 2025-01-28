#!/usr/bin/env python

import sys
import time
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import requests

server_addresses = [
    "192.168.50.30:3000",  # ThinkPad in the AccessPopup network
    "192.168.2.127:3000",  # ThinkPad in home network
]

# Try to reach the server
server_address = None
for address in server_addresses:
    try:
        response = requests.get("http://" + address + "/status")
        if response.ok:
            server_address = address
            print("Received positive response from " + address + ", using as server")
            break
    except Exception as e:
        print("Failed to reach server at " + address)
        print(e)

if server_addresses is None:
    print("Failed to reach server. Shutting down...")
    sys.exit(17)


reader = SimpleMFRC522()

while True:
    print("Hold a tag near the reader")

    try:
        id, text = reader.read()
        print(id)
        print(text)
        response = requests.get(
            "http://"
            + server_address
            + "/register-vote?cardID="
            + str(id)
            + "&party="
            + str(text).strip().upper()
        )
        if response.ok:
            print("Successfully reported vote")
            print("Sleeping for 5 seconds")
            time.sleep(5)
        else:
            print("Failed to report vote")
            print(response.text)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        break
    except Exception as e:
        print("An error occurred")
        print(e)

GPIO.cleanup()

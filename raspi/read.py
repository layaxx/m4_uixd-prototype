#!/usr/bin/env python

import time
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import requests


reader = SimpleMFRC522()

while True:
    print("Hold a tag near the reader")

    try:
        id, text = reader.read()
        print(id)
        print(text)
        response = requests.get(
            "http://192.168.2.127:3000/register-vote?cardID="
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

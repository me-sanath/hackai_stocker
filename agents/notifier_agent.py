from uagents import Agent, Model, Context 
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv


load_dotenv()

sender_email = os.getenv("EMAIL_USERNAME")
sender_password = os.getenv("EMAIL_PASSWORD")

class Request(Model):
    message: str



async def send_email(subject, receiver, message_body):
    # Construct the email message
    sender = "stalker@stocker.com"
    message = f"""\
Subject: {subject}
To: {receiver}
From: {sender}

{message_body}
"""
    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
        server.login("fde5d805050cd3", "c58f62ca42d782")
        server.sendmail(sender, receiver, message)


alice = Agent(name="alice", seed="alice recovery phrase")

print("uAgent address: ", alice.address)

@alice.on_interval(period=2.0)
async def say_hello(ctx: Context):
    ctx.logger.info(f'hello, my name is {ctx.name}')
    await send_email('Hello', 'bob@example.com', f'Hi Bob! I am {ctx.name}. My current')


alice.run()

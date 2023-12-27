import asyncio
import smtplib

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

# Example usage
subject = "Alert Stocker!!"
receiver = "brody@gody.com"
message_body = "This is a test e-mail message."

# Call the function to send the email
asyncio.run(send_email(subject, receiver, message_body))

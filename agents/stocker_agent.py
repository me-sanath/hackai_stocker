from uagents import Agent, Model, Context

stocker = Agent(name="Stocker", seed="bendl")
slaanesh = Agent(name="slaanesh", seed="slaanesh recovery phrase")

class Request(Model):
    message: str

# This decorator tells the agent how to handle messages that match the 'Request' type. It will execute everytime a message is received.
@stocker.on_message(model=Request)
async def handle_message(ctx: Context, sender: str, msg: Request):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

print(stocker.address)
stocker.run()
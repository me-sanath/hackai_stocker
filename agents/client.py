from uagents import Agent, Model, Context

user = Agent(name="user", seed="bendasl",port=8001,endpoint=["http://127.0.0.1:8000"])

class Request(Model):
    message: str

print(user.address)
# This decorator tells your agent to run the function below it on a time interval with the specified 'period' in seconds.
@user.on_interval(period=3.0)
async def send_message(ctx: Context):
    ctx.logger.info(f"Just about to send a message to Bob")
    # ctx.send is a function that sends a message to the specified agent address
    await ctx.send('agent1qv0p5fru7v5pc2hymcfvnt389w9nc8aq3wn9ysl2ym8rn7vshnlx6kj5gs4', Request(message="hello there bob"))
    ctx.logger.info(f"Message has been sent to Bob")

user.run()
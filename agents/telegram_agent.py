from typing import Final
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from getStockPrice import getStockPrice

TOKEN: Final = '6956263387:AAHIlJGLHQFmDjE_7miJjrQ0PeC79Gjhg8E'
BOT_USERNAME: Final = '@StockerAI_bot'
flag = 0

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hello, Thanks for texting StockerAI")

async def help_commad(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("I am StockerAI, How can I help you? ")

async def custom_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("This is a custom command")


# Responses
    
def handle_response(text: str) -> str:
    processed: str = text.lower()
    if 'hello' in processed:
        return 'Hey, there'
    
    if 'hi' in processed:
        return 'Hello'
    
    if 'what can you do' or 'help' or 'features' in processed: 
        return 'I can predict tomorrow\'s stock'
    
    if 'predict' in processed:
        flag = 1
        return 'Enter the Symbol of stock you want to predict'

    if 'how are you' in processed:
        return 'I am fine, How are you?'
    
    return getStockPrice(processed.upper())
    
    return 'I do not understand, Please try again'

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text

    print(f'User ({update.message.chat.id}) in {message_type}: "{text}')

    if message_type == 'group':
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = handle_response(new_text)
        else:
            return
    else:
        response: str = handle_response(text)

    print('Bot: ', response)
    await update.message.reply_text(response)

async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f'Update {update} caused error {context.error}')

if __name__ == '__main__':
    app = Application.builder().token(TOKEN).build()

    #Commands
    app.add_handler(CommandHandler('Start',start_command))
    app.add_handler(CommandHandler('Help',help_commad))
    app.add_handler(CommandHandler('Custom',custom_command))

    #Messages
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    #Errors
    app.add_error_handler(error)

    #Polls the bot
    print('Polling...')
    app.run_polling(poll_interval=3)
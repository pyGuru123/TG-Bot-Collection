import os
import time
import telegram
import asyncio

BOT_TOKEN = "6299965800:AAGAeQaGtB9mqomxxxxxxxxxxxxxx"
BIN_CHANNEL = -1001983800000
FILES_CHANNEL = -1001630400000
DUMP_CHANNEL = -1001986800000

CHANNELS = [FILES_CHANNEL, DUMP_CHANNEL]

async def forward(from_, to_, files_channel, dump_channel):
    bot = telegram.Bot(token=BOT_TOKEN)

    count = 0
    for message_id in range(from_, to_+1):
        try:
            if files_channel:
                message = await bot.copy_message(
                    chat_id=FILES_CHANNEL,
                    from_chat_id=BIN_CHANNEL,
                    message_id=message_id
                )

            if dump_channel:
                message = await bot.copy_message(
                    chat_id=DUMP_CHANNEL,
                    from_chat_id=BIN_CHANNEL,
                    message_id=message_id
                )

            print(message_id)
                
            time.sleep(2.5)
        except Exception as e:
            print(e)

    return count

asyncio.run(forward(10169, 10169, FILES_CHANNEL, DUMP_CHANNEL))
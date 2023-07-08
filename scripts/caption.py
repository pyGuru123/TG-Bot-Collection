import os
import re
import time
import telegram
import asyncio

async def edit_caption(from_, to_, bin_channel, dump_channel):
    bot = telegram.Bot(BOT_TOKEN)

    for message_id in range(from_, to_+1):
        try:
            if bin_channel:
                message = await bot.forward_message(
                    chat_id=dump_channel,
                    from_chat_id=bin_channel,
                    message_id=message_id
                )

                # if message is a without thumbnail

                if message.video:
                    caption = message.video.file_name
                elif message.document:
                    caption = message.document.file_name
                else:
                    # if message with thumbnail
                    caption = message.caption

                caption = caption.split("\n")[0].replace(".", " ").replace("_", " ")
                caption = re.sub(r'@\w+', '', caption)


                await bot.edit_message_caption(chat_id=bin_channel, message_id=message_id, caption=caption)
                await bot.delete_message(chat_id=dump_channel, message_id=message.message_id)
                print(message_id)

            time.sleep(2)
        except Exception as e:
            print(e)

BOT_TOKEN = "6290082613:AAGV48uxncvbpnYpMgW6oVeuu9EoDAeFy8g"
BIN_CHANNEL = "-1001983800000"
DUMP_CHANNEL = "-1001736600000"

asyncio.run(edit_caption(10044, 10533, BIN_CHANNEL, DUMP_CHANNEL))
import os
import time
import telegram
import asyncio

from model import Movie

def get_file_size(bytes):
    if bytes < 1024 ** 3:
        return f"{bytes / (1024 ** 2):.2f} MB"
    else:
        return f"{bytes / (1024 ** 3):.2f} GB"

async def forward(from_, to_, files_channel, dump_channel):
    bot = telegram.Bot(BOT_TOKEN)

    count = 0
    for message_id in range(from_, to_+1):
        try:
            if files_channel:
                message = await bot.forward_message(
                    chat_id=DUMP_CHANNEL,
                    from_chat_id=FILES_CHANNEL,
                    message_id=message_id
                )

                video = False

                if message.video:
                    caption = message.caption or message.video.file_name
                    size = get_file_size(message.video.file_size)
                    channel_id = message.forward_from_chat.id
                    msg_id = message.forward_from_message_id
                    unique_id = message.video.file_unique_id
                    video = True

                elif message.document:
                    caption = message.caption or message.document.file_name
                    size = get_file_size(message.document.file_size)
                    channel_id = message.forward_from_chat.id
                    msg_id = message.forward_from_message_id
                    unique_id = message.document.file_unique_id
                    video = True

                # print(caption)


                if video:
                    movie = Movie(caption, size, channel_id, msg_id, unique_id)
                    movie.save()

                    await bot.delete_message(chat_id=DUMP_CHANNEL, message_id=message.message_id)
                    print(msg_id)

            time.sleep(1)
        except Exception as e:
            print(f"{message_id} - {e}")


BOT_TOKEN = "6290082613:AAGV48uxncvbpnYpxxxxxxxxxxxxxxxxxxxxxxx"
FILES_CHANNEL = "-1001986800000"
DUMP_CHANNEL = "-10017366000000"

asyncio.run(forward(6501, 6900, FILES_CHANNEL, DUMP_CHANNEL))
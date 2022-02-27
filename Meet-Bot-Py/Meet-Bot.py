from time import sleep
import pyautogui as auto
import schedule, webbrowser



link = "meet.google.com/qfc-zsjy-tzd"

time = "13:39:00" 
Etime = "14:40:00"


def join():
    webbrowser.open_new_tab('https://' + link)
    sleep(12)
    auto.hotkey('ctrl', 'd')
    auto.hotkey('ctrl', 'e')
    # auto.hotkey('command', 'd')
    # auto.hotkey('command', 'e')
    sleep(3)
    auto.click(1349, 537)
    auto.click(1349, 570)
  

def end():
    auto.click(1083,975)
    auto.click(987,608)
    auto.click(987,608)

schedule.every().day.at(time).do(join)
schedule.every().day.at(Etime).do(end)

while True:
    schedule.run_pending()
    sleep(1)

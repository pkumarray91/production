
from protocol.src.com.teltonika.TCPlistener.insert_into_tbl import*
from datetime import datetime

socket_receive_time = [2019,12,28,13,58,6,987654]
thread_send_time = [2019,12,29,13,58,6,987654]
kafka_read_time = [2019,12,30,13,58,6,987654]
kafka_publish_time = [2019,12,31,13,58,6,987654]
#insert_db_time ="28/09/2020  13:58:07,464702"
IMEI='000F333536333037303432343431303133'
IMEI_num ='356307042441013'
raw_data_hexa ='000000000000004a08010000017216d6b7b0002e2a05480aaa41f602760000120000000f08ef00f00050041504c80045010100b30005b5000bb600064262d118000009008302c700000000100711557c00010000b4e1'

a = insert_into_tbl(socket_receive_time ,thread_send_time,kafka_read_time,kafka_publish_time,IMEI,IMEI_num,raw_data_hexa)
b = a.insert_data()

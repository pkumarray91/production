from kafka import KafkaConsumer
import datetime
from time import sleep
from protocol.src.com.teltonika.TCPlistener.insert_into_tbl import*
from protocol.src.com.teltonika.Codec.Spliting import *
import json
class readFromKafka:
    def __init__(self):
        self.name = self

        #self.consumer = KafkaConsumer('teltonika_queue_raw_msg', bootstrap_servers='localhost:9092')

    def kafkaread(self):
        consumer = KafkaConsumer('teltonika_queue_raw_msg', bootstrap_servers='localhost:9092',value_deserializer = lambda m: json.loads(m.decode('utf-8')))
        now = datetime.now()
        #dt = datetime.now().isoformat(timespec='microseconds')
        cursor, conn = dbConn.connect_to_db(self)
        a = insert_into_tbl(cursor,conn)

        for message in consumer:
            current_time = now.strftime("%d %b %Y, %I:%M:%S.%f")

            mysplitter = Spliting(message[6]['message'],message[6]['imei_num'],cursor,conn)
            mysplitter.split_hex_string()

            #a.insert_data(message[6]['socketread time'], message[6]['thread time'], message[6]['publishtokafka time'],current_time,message[6]['imei_hex'],message[6]['imei_num'], message[6]['message'])


            print("socket read time",message[6]['socketread time'])
            print("readfromkafka time ", current_time)
            print("publishtokafka time: ",message[6]['publishtokafka time'])
            print("thread time: ",message[6]['thread time'])
            print("imei hex: ",message[6]['imei_hex'])
            print("imei num: ",message[6]['imei_num'])
            print("message: ",message[6]['message'])

c1 = readFromKafka()
c1.kafkaread()
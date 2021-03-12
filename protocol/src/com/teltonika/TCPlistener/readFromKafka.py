from kafka import KafkaConsumer
from datetime import datetime
from time import sleep
from protocol.src.com.teltonika.Codec.Spliting import *
import json
class readFromKafka:
    @staticmethod
    def kafkaread():
        consumer = KafkaConsumer('teltonika_queue_raw_msg', bootstrap_servers='localhost:9092',value_deserializer = lambda m: json.loads(m.decode('utf-8')))
        for message in consumer:

            print("socket read time",message[6]['socketread time'])
            print("thread time: ", message[6]['thread time'])
            print("publishtokafka time: ", message[6]['publishtokafka time'])
            print("readfromkafka time ",datetime.now().strftime("%d/%m/%Y  %H:%M:%S,%f"))
            print("imei num: ",message[6]['imei_num'])
            print("message: ",message[6]['message'])




c1 = readFromKafka
c1.kafkaread()
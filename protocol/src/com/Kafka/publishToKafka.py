from kafka import KafkaProducer
from datetime import datetime
from time import sleep
import json
class publishToKafka:
    def __init__(self,message):
        #self.producer = KafkaProducer(bootstrap_servers='localhost:9092')
        self.message = message
    def kafkasend(self):
        message = self.message
        #producer = self.producer
        #_producer  = producer
        producer = KafkaProducer(bootstrap_servers='localhost:9092',value_serializer = lambda v: json.dumps(v).encode('utf-8'))
        now = datetime.now()
        #dt = datetime.now().isoformat(timespec='microseconds')
        if (len(message) == 5):
            try:
                current_time = now.strftime("%d %b %Y, %I:%M:%S.%f")
                #current_time = [dt.year, dt.month, dt.day, dt.time().hour, dt.time().minute, dt.time().second,dt.time().microsecond]
                producer.send('teltonika_queue_raw_msg', {'socketread time': message[0], 'thread time': message[1],'publishtokafka time': current_time, 'imei_hex': message[2],'imei_num': message[3], 'message': message[4]})
                #print(f'from kafka{current_time},{message}')
            except:
                print("Error occur while sending data")
        else:
            print("length is not same")
'''
producer = KafkaProducer(bootstrap_servers='localhost:9092')
publisher.kafkasend(self,messagearray,producer)
'''
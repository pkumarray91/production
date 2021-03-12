from kafka import KafkaProducer
from datetime import datetime
from time import sleep
import json
class publishToKafka:
    def __init__(self,message):
       #producer = KafkaProducer(bootstrap_servers='localhost:9092')
      self.message = message
    def kafkasend(self):
        message = self.message
        producer = KafkaProducer(bootstrap_servers='localhost:9092',value_serializer = lambda v: json.dumps(v).encode('utf-8'))
        now = datetime.now()
        if(len(message)==4):
            try:
                current_time = now.strftime("%d/%m/%Y  %H:%M:%S,%f")
                producer.send('teltonika_queue_raw_msg',{'socketread time': message[0], 'thread time': message[1],'publishtokafka time': current_time,'imei_hex':message[2] , 'imei_num': message[3], 'message': message[4]})

                #print(f'from kafka{current_time},{message}')
            except:
                print("Error occur while sending data")
        else:
            print("length is not same")














# This is the Thread implementation of the tcp_server class
from logging import *
from threading import *
from datetime import datetime
from protocol.src.com.teltonika.TCPlistener.tcp_logger import *
from protocol.src.com.teltonika.Codec.IMEI_validation import *
from protocol.src.com.teltonika.Codec.avl_data_package_count import *
from protocol.src.com.Kafka.publishToKafka import *
class thread_log_filter(Filter):
    def __init__(self, thread_name, *args, **kwargs):
        logging.Filter.__init__(self, *args, **kwargs)
        self.thread_name = thread_name
    def filter(self, record):
        return record.threadName == self.thread_name
class tcp_thread_service():
    ' Class to receive the IMEI and HEX code from the client '
    def __init__(self, client):
        self.client = client
        self.buffer_size = 4096
        #print('inside tcp_thread_service')
    def start_thread_logging(self):
        log_file_path = (Path.home()).joinpath('log')
        thread_name = current_thread().name
        log_file_path= log_file_path.joinpath(str(thread_name) +'.log')
        name_logger = logging.getLogger(__name__)
        name_logger.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(name)s : %(message)s')
        file_handler = RotatingFileHandler(log_file_path, maxBytes=10 * 1024 * 1024, backupCount=10)
        file_handler.setFormatter(formatter)
        log_filter = thread_log_filter(thread_name)
        file_handler.addFilter(log_filter)
        name_logger.addHandler(file_handler)
        return name_logger
    def thd_service(self):
        #print('inside the thd service', self.client, self.buffer_size )
        _client = self.client
        received_imei = False
        # AP and BR to look whether the message should be in bytes. if yes how to send this?
        client_input = '0'
        client_response = bytes()
        # if the client sends IMEI, raw msg1, raw msg2, raw msg3
        # then again IMEI, raw msg1, raw msg2, raw msg3
        # write logic to check IMEI sent twice.
        # recv outside
        # check received_imei true or false
        # msg length less than 30
        # if received_imei is true and msg length is less than 30 then
        # check the last time IMEI and this new IMEI
        # if same then send b'01' response and keep received_imei = true
        # if different then we have problem in our thread.
        # else if (length is more than 30) and received_imei is false
        # send b'\00' response (should work with current if below)
        # else if (length is more than 30) and received_imei is true
        # go to second if (process raw data)
        first_imei_input = 0
        while  len(client_input)!=0:
            now = datetime.now()
            #date_time = now.strftime("%d %b %Y, %I:%M:%S")
            #dt = datetime.now().isoformat(timespec='microseconds')
            socket_read_time = now.strftime("%d %b %Y, %I:%M:%S.%f")
            #socket_read_time =[dt.year, dt.month, dt.day, dt.time().hour, dt.time().minute, dt.time().second,dt.time().microsecond]
            #socket_read_time = [dt.year, dt.month, dt.day, dt.time().hour, dt.time().minute, dt.time().second,dt.time().microsecond]

            #socket_read_time = now.strftime("%d/%m/%Y  %H:%M:%S,%f")
            client_input = _client.recv(self.buffer_size)

            if (len(client_input) <= 36):
                # first message is the IMEI
                if received_imei == False:
                    myimei = IMEI_validation(client_input)
                    valid_yes_no, imei_num = myimei.check_my_imei()
                    if valid_yes_no:
                        received_imei = True
                        first_imei_input = client_input
                        client_response = bytes(b'\01')
                        current_thread().setName(str(imei_num))  # thread-1 renamed by imei_num
                        th_logger = tcp_thread_service.start_thread_logging(self)
                        th_logger.info(f"{client_input.decode('utf-8')}")
                        #imei_log = tcp_thread_service.call_logger(self, str(imei_num))
                        #imei_log.info(f"{imei_num}")
                        # send response to the client that imei is valid
                        _client.send(client_response)
                    else:
                        client_response = bytes(b'\00')
                        _client.send(client_response)
                else:
                    if first_imei_input == client_input:
                        received_imei = True
                        client_response = bytes(b'\01')
                        th_logger.info(f"{client_input.decode('utf-8')}")
                        #imei_log.info(f"{imei_num}")
                        # send response to the client that imei is valid
                        _client.send(client_response)
            else:
                # process raw data
                if received_imei == True:
                    # client_input = _client.recv(self.buffer_size)
                    # print('client input ', client_input)
                    my_avl_data_count = avl_data_package_count(client_input)
                    th_logger.info(f"{client_input.decode('utf-8')}")
                    now = datetime.now()
                    #dt = datetime.now().isoformat(timespec='microseconds')
                    current_time = now.strftime("%d %b %Y, %I:%M:%S.%f")
                    #current_time = [dt.year, dt.month, dt.day, dt.time().hour, dt.time().minute, dt.time().second,dt.time().microsecond]
                    #current_time = [dt.year, dt.month, dt.day, dt.time().hour, dt.time().minute, dt.time().second,dt.time().microsecond]
                    messagearray = [(socket_read_time), (current_time),str(first_imei_input), str(imei_num),client_input.decode('utf-8')]
                    #messagearray = [str(socket_read_time),str(current_time), str(imei_num),client_input.decode('utf-8')]  # array for sending data to kafka
                    publisher = publishToKafka(messagearray)
                    publisher.kafkasend()
                    my_result, data_count = my_avl_data_count.avl_data_count_comparison()
                    #imei_log.info(f"{client_input.decode('utf-8')}")
                    if my_result is True:
                        print("AVL data count matches", data_count)
                        client_response = data_count
                        _client.send(client_response.encode('utf-8'))
                    else:
                        print("AVL data count does not match", data_count)
                        client_response = data_count
                        _client.send(client_response.encode('utf-8'))
# create the log file with imei_num.log file
# insert the information in the log file see Teltonika.msg file.
# format of data required
# imei, raw_msg1
# imei, raw_msg2
# etc.
# we will publish this in the KAFKA que
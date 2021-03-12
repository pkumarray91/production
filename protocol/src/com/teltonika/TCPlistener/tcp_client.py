import logging
import socket
import sys
import traceback
import datetime
import time
from protocol.src.com.teltonika.Codec.IMEI_validation import *
from protocol.src.com.teltonika.Codec.avl_data_package_count import *
from configparser import ConfigParser
from protocol.src.com.teltonika.TCPlistener.tcp_logger import *
class tcp_client:
    'This is the TCP client class for sending the Teltonika messages to tcp_server'
    def __init__(self):
        self.name = self
    @staticmethod
    def read_config(self):
        # read the tcp_config.ini file and get the values
        tcp_config = ConfigParser()
        tcp_config.read('config.ini')
        tcp_host = tcp_config['tcp_client']['host']
        tcp_port = tcp_config['tcp_client']['port']
        tcp_file_name = tcp_config['tcp_client']['log_file_name']
        print("Host : ", tcp_host, " Port : ", tcp_port , "filename:" , tcp_file_name)
        return tcp_host, int(tcp_port) ,tcp_file_name
    @staticmethod
    def call_logger(self , filename):
        #print('before calling the logger')
        log_file_name = filename
        # create the logger and get the handle
        cl_logger = tcp_logger(log_file_name)
        tcp_log_info = cl_logger.create_logger()
        tcp_log_info.info('Starting the logger')
        return tcp_log_info
    def revrse_read(line):
        reverse_line = line[::-1].decode('utf-8')
        reverse_line = reverse_line.split(" :")
        reverse_line = reverse_line[0]
        reverse_line = reverse_line[::-1]
        return reverse_line
    def run_client(self):
        # read the tcp_config.ini file
        tcp_host, tcp_port, tcp_file_name = tcp_client.read_config(self)
        # start the logger
        cl_log = tcp_client.call_logger(self,tcp_file_name)
        # create TCP IP socket
        try:
            soc_tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            soc_tcp.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            cl_log.info("Socket successfully created")
        except socket.error as err:
            print("Socket creation failed with error %s" % err)
            sys.exit()
        # Try to bind the socket and port
        try:
            soc_tcp.connect((tcp_host, tcp_port))
            cl_log.info("connecting to host and port ")
        except:
            print("connection failed. Error : " + str(sys.exc_info()))
            sys.exit()
        # open the file Teltonika.msg and read the contents
        # send each line from client to server as utf8 format
        # for each line sent wait for am ACK = 01 from server
        # when ACK = 01 is received from server send the next line.
        # write the sent string in the logger file
        # when end of file reaches after the last ACK close the file and connection
        # Ankush to do this
        f = open('Teltonika_msg', 'rb')
        empty_line = False
        while empty_line != True:
            line = f.readline(4096)
            line = tcp_client.revrse_read(line.rstrip())
            if len(line) != 0:
                # read line from Teltonika_msg file and check imei is valid or not if valid then send it to server
                if len(line) <= 36:
                    myimei = IMEI_validation(line)
                    valid_yes_no, imei_num = myimei.check_my_imei()
                    if valid_yes_no:  # if True:
                        print("valid IMEI")
                        soc_tcp.send(line.encode('utf-8'))
                        print(soc_tcp.recv(4096))
                    else:
                        print("Invalid IMEI")
                else:
                    # read line from Teltonika_msg file and remove extra space from that raw_msg and send it to server
                    # it run avl_data_pacakage_count_on raw_msg and get datacount
                    if valid_yes_no == True:
                        time.sleep(0.0001)
                        raw_msg = line.replace(" ", "")
                        soc_tcp.send(raw_msg.encode('utf-8'))
                        print(raw_msg)
                        my_avl_data_count = avl_data_package_count(str(raw_msg).rstrip())
                        my_result, data_count = my_avl_data_count.avl_data_count_comparison()
                        if my_result is True:
                            print("AVL data count matches", data_count)
                        else:
                            print("AVL data count does not match", data_count)
                        datacount_check = soc_tcp.recv(4096)
                        while str(datacount_check.decode('utf-8')) != data_count:
                            soc_tcp.send(raw_msg.encode('utf-8'))
                            datacount_check = soc_tcp.recv(4096)
            else:
                soc_tcp.send(''.encode('utf-8'))
                empty_line = True
        print("next")
        soc_tcp.close()
        print('connection closed')
t1 = tcp_client()
t1.run_client()
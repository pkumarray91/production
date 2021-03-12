import logging
import socket
import sys
import traceback
import asyncio
from threading import Thread
from _thread import *
from configparser import ConfigParser
from protocol.src.com.teltonika.TCPlistener.tcp_logger import *
from protocol.src.com.teltonika.TCPlistener.tcp_thread_service import *
class tcp_server:
    'This is the TCP server class for receiving the Teltonika messages from tcp_client and sends ACK'
    def __init__(self):
        self.name = self
    @staticmethod
    def read_config(self):
        # read the config.ini file and get the values
        tcp_config = ConfigParser()
        tcp_config.read('config.ini')
        tcp_host = tcp_config['tcp_server']['host']
        tcp_port = tcp_config['tcp_server']['port']
        tcp_file_name = tcp_config['tcp_server']['log_file_name']
        # print('read config.ini file and params')
        # print("Host : ", tcp_host, " Port : ", tcp_port, "Log file name : ", tcp_file_name)
        return tcp_host, int(tcp_port), tcp_file_name
    @staticmethod
    def call_logger(self, file_name):
        # print('before calling the logger')
        log_file_name = file_name
        # create the logger and get the handle
        cl_logger = tcp_logger(log_file_name)
        tcp_log_info = cl_logger.create_logger()
        tcp_log_info.info('Starting the logger')
        return tcp_log_info
    def run_server(self):
        # read the config.ini file
        tcp_host, tcp_port, tcp_file_name = tcp_server.read_config(self)
        # start the logger
        cl_log = tcp_server.call_logger(self, tcp_file_name)
        # print('in runserver')
        # create TCP IP socket
        try:
            soc_tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            soc_tcp.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            cl_log.info("Socket successfully created")
        except socket.error as err:
            print("Socket creation failed with error %s" % err)
            print('This is a test')
            sys.exit()
        # Try to bind the socket and port
        try:
            soc_tcp.bind((tcp_host, tcp_port))
            cl_log.info("Binding to host and port ")
        except:
            print("bind failed. Error : " + str(sys.exc_info()))
            sys.exit()
        # listen on the port, what number should be here. queue for 1000 requests.
        # don't know whether this work for that load. CHECK
        try:
            soc_tcp.listen(10)
            cl_log.info("listening on the socket")
        except:
            print("listening failed. Error : " + str(sys.exc_info()))
            sys.exit()
        # infinite loop - don't need to reset from out
        while True:
            # asyncio to be used afterwards. just implement the threading now
            # call async def here : fire and forget async_for_conn()
            # asyncio.ensure_future(aysnc_for_conn(soc_tcp, cl_log))
            # now the client detail are with async_for_conn()
            # it will close the connection etc.
            # we don't exit from this loop as this will run forever
            try:
                tcp_conn, address = soc_tcp.accept()
                ip, port = str(address[0]), str(address[1])
                cl_log.info("Connected with " + ip + ":" + port)
                Thread(target=client_thread , args=(tcp_conn,cl_log)).start()
                #start_new_thread(client_thread, args=(tcp_conn, cl_log))
            except:
                print("thread did not start")
                traceback.print_exc()
            #tcp_conn.close()
            print("next")
# function to run with fire and forget : await
# async def aysnc_for_conn(soc_tcp, cl_log):
#     await call_new(soc_tcp, cl_log)
# function to run with fire and forget : await
# async def aysnc_for_conn(soc_tcp, cl_log):
# async def call_new(soc_tcp, cl_log):
#     tcp_conn, address = soc_tcp.accept()
#     ip, port = str(address[0]), str(address[1])
#     cl_log("Connected with " + ip + ":" + port)
#     try:
#         start_new_thread(client_thread, args=(tcp_conn, cl_log))
#     except:
#         print("thread did not start")
#         traceback.print_exc()
#     tcp_conn.close()
def client_thread(tcp_conn, cl_log):
    # call tcp_thread_Service to receive data from client
    cl_log.info("Inside the Thread calling tcp_thread_service")
    thread_service = tcp_thread_service(tcp_conn)
    thread_service.thd_service()
    #cl_log.info("Tcp Thread service is now working for :", tcp_conn)
t1 = tcp_server()
t1.run_server()

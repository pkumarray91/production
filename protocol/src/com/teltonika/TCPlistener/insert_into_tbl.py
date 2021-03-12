import cx_Oracle
from protocol.src.com.teltonika.TCPlistener.dbConn import*
from datetime import datetime
import time

class insert_into_tbl:

    def __init__(self,cursor,conn):
        self.cursor = cursor
        self.conn = conn
        # self.socket_receive_time  = socket_receive_time
        # self.thread_send_time = thread_send_time
        # self.kafka_read_time = kafka_read_time
        # self.kafka_publish_time = kafka_publish_time
        # self.IMEI = IMEI
        # self.IMEI_num=IMEI_num
        # self.raw_data_hexa =  raw_data_hexa
    def insert_data(self,socket_receive_time ,thread_send_time,kafka_read_time,kafka_publish_time,IMEI,IMEI_num,raw_data_hexa):
        _cursor = self.cursor
        _conn = self.conn
        # mysocket_receive_time  = self.socket_receive_time
        # mythread_send_time = self.thread_send_time
        # mykafka_read_time = self.kafka_read_time
        # mykafka_publish_time = self.kafka_publish_time
        # myIMEI =self.IMEI
        # myIMEI_num =self.IMEI_num
        # myraw_data_hexa =self.raw_data_hexa




        insert_raw_msg = 'INSERT INTO tblrawmessage(socket_receive_time ,thread_send_time,kafka_read_time,kafka_publish_time,IMEI,IMEI_num,raw_data_hexa)' 'VALUES (:mysocket_receive_time ,:mythread_send_time,:mykafka_read_time,:mykafka_publish_time,:myIMEI,:myIMEI_num,:myraw_data_hexa)'
        #insert_raw_msg = """INSERT INTO tblrawmessage (soc_recd_time,thread_pub_time,pub_kafka_time,read_kafka_time,imei_hex,imei_num,raw_msg) VALUES ('2020-09-28 13:58:06,27','2020-09-28 13:58:06,27','2020-09-28 13:58:06,27','2020-09-28 13:58:06,27',"000F333536333037303432343431303133","356307042441013","000000000000004a08010000017216d6b7b0002e2a05480aaa41f602760000120000000f08ef00f00050041504c80045010100b30005b5000bb600064262d118000009008302c700000000100711557c00010000b4e1") """


        print("soc_recd_time",socket_receive_time )
        print(insert_raw_msg)
        _cursor.execute(insert_raw_msg,(socket_receive_time ,thread_send_time,kafka_read_time,kafka_publish_time,IMEI,IMEI_num,raw_data_hexa))
        #cursor.execute(insert_raw_msg, (datetime(mysocket_receive_time[0], mysocket_receive_time[1], mysocket_receive_time[2],mysocket_receive_time[3], mysocket_receive_time[4], mysocket_receive_time[5],mysocket_receive_time[6]),
                                        # datetime(mythread_send_time[0], mythread_send_time[1], mythread_send_time[2],mythread_send_time[3], mythread_send_time[4], mythread_send_time[5],mythread_send_time[6]),
                                        # datetime(mykafka_read_time[0], mykafka_read_time[1], mykafka_read_time[2],mykafka_read_time[3], mykafka_read_time[4], mykafka_read_time[5],mykafka_read_time[6]),
                                        # datetime(mykafka_publish_time[0], mykafka_publish_time[1], mykafka_publish_time[2],mykafka_publish_time[3], mykafka_publish_time[4], mykafka_publish_time[5],mykafka_publish_time[6]),
                                        # myIMEI, myIMEI_num, myraw_data_hexa))
        _conn.commit()


    def insert_into_Live_map(self,IMEI,RECEIVE_TIME,LONGITUDE,LATITUDE,ALTITUDE,ANGLE,SATELLITES,SPEED):
             _cursor = self.cursor
             _conn = self.conn
             update_query = "UPDATE livemap SET RECEIVE_TIME = :RECEIVE_TIME,LONGITUDE = :LONGITUDE,LATITUDE =:LATITUDE,ALTITUDE = :ALTITUDE,ANGLE = :ANGLE,SATELLITES =:SATELLITES,SPEED = :SPEED where imei=:imei"
             _cursor.execute(update_query,(RECEIVE_TIME,LONGITUDE,LATITUDE,ALTITUDE,ANGLE,SATELLITES,SPEED,IMEI))

             _conn.commit()

    def insert_into_Main_table(self,IMEI,PREAMBLE_SIZE,PREAMBLE_VALUE,PREAMBLE_HEXVALUE,AVL_DATA_LENGTH_SIZE,AVL_DATA_LENGTH_VALUE,AVL_DATA_LENGTH_HEXVALUE,CRC_SIZE,CRC_VALUE,CRC_HEXVALUE):
        _cursor = self.cursor
        _conn = self.conn
        insert_main_table =  'INSERT INTO maintable(IMEI,PREAMBLE_SIZE,PREAMBLE_VALUE,PREAMBLE_HEXVALUE,AVL_DATA_LENGTH_SIZE,AVL_DATA_LENGTH_VALUE,AVL_DATA_LENGTH_HEXVALUE,CRC_SIZE,CRC_VALUE,CRC_HEXVALUE)' 'VALUES(:myIMEI,:myPREAMBLE_SIZE,:myPREAMBLE_VALUE,:myPREAMBLE_HEXVALUE,:myAVL_DATA_LENGTH_SIZE,:myAVL_DATA_LENGTH_VALUE,:myAVL_DATA_LENGTH_HEXVALUE,:myCRC_SIZE,:myCRC_VALUE,:myCRC_HEXVALUE)'
        print(insert_main_table)
        _cursor.execute(insert_main_table,(IMEI,PREAMBLE_SIZE,PREAMBLE_VALUE,PREAMBLE_HEXVALUE,AVL_DATA_LENGTH_SIZE,AVL_DATA_LENGTH_VALUE,AVL_DATA_LENGTH_HEXVALUE,CRC_SIZE,CRC_VALUE,CRC_HEXVALUE))
        _conn.commit()

    def insert_into_avlData_table(self,IMEI,Codec_ID_size,Codec_ID_value,Codec_ID_HEXVALUE,start_avl_data_count_size,start_avl_data_count_value,start_avl_data_count_hexvalue,end_avl_data_count_size,end_avl_data_count_value,end_avl_data_count_hexvalue):
        _cursor = self.cursor
        _conn = self.conn
        MAIN_TABLE_ID = '(SELECT MAINTABLEID FROM MAINTABLE WHERE IMEI = :IMEI)'
        _cursor.execute(MAIN_TABLE_ID,{ 'IMEI':IMEI})
        val = _cursor.fetchone()
        _conn.commit()
        print('value',val[0])

        insert_into_AVLdata = 'INSERT INTO AVLData(MAIN_TABLE_ID,IMEI,Codec_ID_size,Codec_ID_value,Codec_ID_HEXVALUE,start_avl_data_count_size,start_avl_data_count_value,start_avl_data_count_hexvalue,end_avl_data_count_size,end_avl_data_count_value,end_avl_data_count_hexvalue)''VALUES(:MAIN_TABLE_ID,:myIMEI,:myCodec_ID_size,:myCodec_ID_value,:myCodec_ID_HEXVALUE,:mystart_avl_data_count_size,:mystart_avl_data_count_value,:mystart_avl_data_count_hexvalue,:myend_avl_data_count_size,:myend_avl_data_count_value,:myend_avl_data_count_hexvalue)'
        _cursor.execute(insert_into_AVLdata,(int(val[0]),IMEI,Codec_ID_size,Codec_ID_value,Codec_ID_HEXVALUE,start_avl_data_count_size,start_avl_data_count_value,start_avl_data_count_hexvalue,end_avl_data_count_size,end_avl_data_count_value,end_avl_data_count_hexvalue))
        _conn.commit()
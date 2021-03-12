"""
Class Spliting splits the hexadecimal stream which is coming from the client into various parts:
1. preamble(4 bytes)
2. dataLength(4 bytes)
3. CodecID (1 byte)
4. noOfData1 (1 byte)
5. AVLData (remaining data: eg 'X' bytes)
6. noOfData2 (1 bytes)
7. crc16(4 bytes)
"""
from protocol.src.com.teltonika.TCPlistener.dbConn import *
from protocol.src.com.teltonika.Codec.AVLData import *
from protocol.src.com.teltonika.TCPlistener.insert_into_tbl import *

class Spliting:
    # class to split the hexadecimal stream


    def __init__(self,hexString,IMEI,cursor,conn):
        self.hexString = hexString
        self.IMEI = IMEI
        self.cursor = cursor
        self.conn = conn

    def call_avl(self, my_avl, my_datacount,my_IMEI):
        avl = AVLData(my_avl, my_datacount,my_IMEI)
        return avl

    def split_hex_string(self):
        hexString = self.hexString
        IMEI = self.IMEI
        _cursor = self.cursor
        _conn = self.conn
        preamble , dataLength ,CodecID ,noOfData1 ,AVLData,noOfData2,crc16 = 0,0,0,0,0,0,0
        #hexString = "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF"
        #print(hexString)

        #slice operator for getting first 4 bytes(8 bits) for preamble
        PREAMBLE_HEXVALUE = hexString[:8]
        PREAMBLE_VALUE = int(PREAMBLE_HEXVALUE,16)
        PREAMBLE_SIZE = len(PREAMBLE_HEXVALUE)


        #slice operator for getting 4 bytes(8bits) after preamble
        AVL_DATA_LENGTH_HEXVALUE = hexString[8:16]
        AVL_DATA_LENGTH_VALUE = int(AVL_DATA_LENGTH_HEXVALUE ,16)
        AVL_DATA_LENGTH_SIZE = len(AVL_DATA_LENGTH_HEXVALUE)


        #slice operator for getting 1 byte(2 bits) after dataLength
        Codec_ID_HEXVALUE = hexString[16:18]
        Codec_ID_value = int(Codec_ID_HEXVALUE,16)
        Codec_ID_size = len(Codec_ID_HEXVALUE)
        #if CodecID == '8E':

        #slice operator for getting 1 byte(2 bits) after CodecID
        start_avl_data_count_hexvalue = hexString[18:20]
        start_avl_data_count_value = int(start_avl_data_count_hexvalue,16)
        start_avl_data_count_size = len(start_avl_data_count_hexvalue)

        # slice operator for getting 1 byte(2 bits) from the end
        end_avl_data_count_hexvalue = hexString[-10:-8]
        end_avl_data_count_value = int(end_avl_data_count_hexvalue, 16)
        end_avl_data_count_size = len(end_avl_data_count_hexvalue)

        #slice opeator for getting 4 bytes(8 bits) from the end of hexadecimal stream
        CRC_HEXVALUE = hexString[-8:]
        CRC_VALUE = int(CRC_HEXVALUE,16)
        CRC_SIZE = len(CRC_HEXVALUE)
        #remaining data is AVLData
        myAVLData = hexString[20:-10]

        #print(type(AVLData))

        print("preamble",PREAMBLE_SIZE)
        print("dataLength", dataLength)
        print("CodecID", Codec_ID_HEXVALUE)
        print("start_avl_data_count_hexvalue", start_avl_data_count_hexvalue)
        print("end_avl_data_count_hexvalue", end_avl_data_count_hexvalue)
        print("crc16", CRC_HEXVALUE)
        print("AvlData", myAVLData)

        a = insert_into_tbl(_cursor,_conn)
        a.insert_into_Main_table(IMEI,PREAMBLE_SIZE,PREAMBLE_VALUE,PREAMBLE_HEXVALUE,AVL_DATA_LENGTH_SIZE,AVL_DATA_LENGTH_VALUE,AVL_DATA_LENGTH_HEXVALUE,CRC_SIZE,CRC_VALUE,CRC_HEXVALUE)
        a.insert_into_avlData_table(IMEI,Codec_ID_size,Codec_ID_value,Codec_ID_HEXVALUE,start_avl_data_count_size,start_avl_data_count_value,start_avl_data_count_hexvalue,end_avl_data_count_size,end_avl_data_count_value,end_avl_data_count_hexvalue)
        avl = Spliting.call_avl(self, myAVLData, int(noOfData1),IMEI)
        avl.AVL_splitter()


"""

Driver code
======================================================================================================================
my_hexString = "000000000000003608010000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000010000C7CF"
print(type(hexString))
my_split = Spliting(my_hexString)
value = my_split.split_hex_string()

"""

from configparser import ConfigParser
import cx_Oracle
#from insert_into_tbl import*
class dbConn:
    def __init__(self):
        self.name = self
    #def read_config(self):
        #tcp_config = ConfigParser()
        #tcp_config.read('config.ini')
        #user = tcp_config['db_connection']['user']
        #password = tcp_config['db_connection']['password']
        #dsn = tcp_config['db_connection']['dsn']
        #print("user",user, password,dsn)

        #return user,password,dsn
    def connect_to_db(self):
        #user , password , dsn = dbConn.read_config(self)
        try:
            conn = cx_Oracle.connect('AKSHADAPA', 'SAPAStelematics123','devtrxdb_low')
            cursor = conn.cursor()
            print("Connected")
        except cx_Oracle.Error as e:
            print(f"Error Occurred: {e}")
        return cursor, conn
#a = dbConn()
#a.connect_to_db()
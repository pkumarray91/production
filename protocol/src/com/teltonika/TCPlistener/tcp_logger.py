import logging
from logging.handlers import RotatingFileHandler
from logging import FileHandler
from pathlib import Path


class tcp_logger:
    'logger class to use same logging file'

    def __init__(self, name):
        # Create directory 'log' if directory does not exists
        home_dir = Path.home()
        log_file_path = home_dir.joinpath('log')

        if not Path.is_dir(log_file_path):
            log_file_path.mkdir()
        else:
            print("Log Folder and log File exists")
        print('The log file are at following place : ', log_file_path)
        self.name1 = log_file_path.joinpath(name+'.log')
        # print('The name of the file is : ', self.name1)
<<<<<<< HEAD
        self.name = self.name1
        # print('The  : ', self.name)
=======

>>>>>>> Dev_Branch

    def create_logger(self):
        # start logging handler creation

<<<<<<< HEAD
        print('inside creating the file : ', self.name1)
=======
        # print('inside creating the file : ', self.name1)
>>>>>>> Dev_Branch
        name_logger = logging.getLogger(__name__)
        name_logger.setLevel(logging.INFO)  # set the logging at INFO level
        formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(name)s : %(message)s')
        # Rotate the file to different name as the size is reached to 10MB
        #file_handler = RotatingFileHandler(self.name1, maxBytes=10 * 1024 * 1024, backupCount=10)
        file_handler =  FileHandler(self.name1)
        file_handler.setFormatter(formatter)
        name_logger.addHandler(file_handler)
        print('create logger end')
        return name_logger


"""
#How to call this class and get the data
my1_logger = tcp_logger('test1')
my1 = my1_logger.create_logger()
my1.info('MY first test')

my2_logger = tcp_logger('test2')
my2 = my2_logger.create_logger()
my2.info('MY second test')

my1.info('MY first test1111111111111')
my2.info('MY second test2222222222222')

my1.info('This is another test')
my2.info('Another one')

"""
from protocol.src.com.teltonika.Codec.GPSElement import *
from protocol.src.com.teltonika.Codec.IOelement import*

class AVLData:
    #class which splits the AVLData

    def __init__(self, AVLData,datacount,IMEI):
            self.AVLData = AVLData
            self.datacount = datacount
            self.IMEI = IMEI



    def AVL_splitter(self):
        AVLData = self.AVLData
        datacount = self.datacount
        IMEI = self.IMEI
        sum1 = 0

        for i in range(1, datacount+1, +1):
            Timestamp = AVLData[sum1:sum1+16]
            Priority = AVLData[sum1+16:sum1+18]
            print("Timestamp", Timestamp)
            print("Priority", Priority)
            my_GPSElement = AVLData[sum1+18:sum1+48]
            print("GPS",my_GPSElement)
            myGPS = GPSElement(my_GPSElement,IMEI)
            myGPS.GPSElement_splitter()

            my_IOelement = AVLData[sum1+48:]
            myIO = IOelement(my_IOelement)
            sum = myIO.IOelement_splitter()
            #print("sum", sum)

            sum1 = i*len(Timestamp)+i*len(Priority)+i*len(my_GPSElement)+i*int(sum)+i*4








































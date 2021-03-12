from protocol.src.com.teltonika.Codec.GPSElement import *

# 1 AVLData
my_gps = {
    #'0075C685001D1B550940000120000':'358975458916467',
    'EE6D97A90311F46C0940010E200000':'358975458916467',

}

for my_GPS1, my_imei in my_gps.items():
    # print(my_GPS1)
    # print(my_datacount1)
    myGPS = GPSElement(my_GPS1,my_imei)
    GPSElement1 = myGPS.GPSElement_splitter()
    # print(GPSElement1)

"""
#2 Avldata(3rd example from wiki)

my_gps={
   "000000000000000000000000000000":2,
   "000000000000000000000000000000":2,

}

for my_GPS1,my_datacount1 in my_gps.items():
   #print(my_GPS1)
   #print(my_datacount1)
   myGPS = GPSElement(my_GPS1,my_datacount1)
   GPSElement1 = myGPS.GPSElement_splitter()
   #print(GPSElement1)



#1 AVLData

my_gps={
   "209cca80209a690000940000120000",1
}

for my_GPS1,my_datacount1 in my_gps.items():
   #print(my_GPS1)
   #print(my_datacount1)
   myGPS = GPSElement(my_GPS1,my_datacount1)
   GPSElement1 = myGPS.GPSElement_splitter()
   #print(GPSElement1)


#4 AVLData







my_gps={
   "0F14F650209CCA80006F00D6040004":4,
   "0F14FFE0209CC580006E00C0050001":4,
   "0F150F00209CD20000950108040000":4,
   "0F150A50209CCCC000930068040000":4
}
for my_GPS1,my_datacount1 in my_gps.items():
   #print(my_GPS1)
   #print(my_datacount1)
   myGPS = GPSElement(my_GPS1,my_datacount1)
   GPSElement1 = myGPS.GPSElement_splitter()
   #print(GPSElement1)

"""



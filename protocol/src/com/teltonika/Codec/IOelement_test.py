from protocol.src.com.teltonika.Codec.IOelement import *

"""

my_IO={
"0105021503010101425E0F01F10000601A014E0000000000000000":1
}
for my_IO1,my_datacount1 in my_IO.items():
   #print(my_IO1)
   #print(my_datacount1)
   myIO = IOelement(my_IO1,my_datacount1)
   GPSElement1 = myIO.IOelement_splitter()


"""
# 4 AVLData
my_IO = {
    "0004030101150316030001460000015D00": 4,
    "0004030101150316010001460000015E00": 4,
    "0004030101150016030001460000015D00": 4,
    "0004030101150016030001460000015B00": 4
}
for my_IO1, my_datacount1 in my_IO.items():
    myIO = IOelement(my_IO1)
    GPSElement1 = myIO.IOelement_splitter()
    # print(GPSElement1)



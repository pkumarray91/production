"""
This class is call by AVLData class
--It splits the ID and values
--then this ID and values is stored in database





"""
"""
This class is call by AVLData class
--It splits the ID and values
--then this ID and values is stored in database





"""
from protocol.src.com.teltonika.TCPlistener.dbConn import *
class IOelement:

    def __init__(self, IOelement):
        self.IOelement = IOelement
        #self.datacount = datacount
    def IOelement_splitter(self):
        IOelement = self.IOelement
        #datacount = self.datacount


        #splits the Event_ID and element_count
        Event_ID = IOelement[0:2]
        print("Event_ID", Event_ID)

        element_count = IOelement[2:4]
        print("Element_count", element_count)
        print("----------------------------------")

        # id_count countes the number of times the ID repeats = Element_count
        id_count = 0
        # sum of all the len(ID),len(values),len(count)
        sum = 0
        # for element counter
        no_of_property = 1

        cursor, conn = dbConn.connect_to_db(self)



        # Loop for element counter
        while no_of_property <= 8:
        #while  no_of_property < int(element_count,16) + len(Event_ID)+len(element_count)+4:
        #while id_count <= int(element_count,16) - 1:

            count = IOelement[sum + 4:sum + 6]
            print(f'{no_of_property}b element count {count}')
            print("*********************************")
            no_of_property = no_of_property * 2
            id_count = id_count + 1
            counter = 0
            for i in range(0,int(count)):
                Id = IOelement[sum+counter+6:sum+counter+8]
                value = IOelement[sum+counter+8:sum+counter+10+no_of_property - 2]
                print("Id",Id)
                print("value", value)
                counter = counter + len(Id) +len(value)
                #print("counter",counter)
                print("=====================================")
            sum = sum + counter + len(count)

        return sum
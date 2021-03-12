from protocol.src.com.teltonika.Codec.twos_complement import*
from protocol.src.com.teltonika.TCPlistener.dbConn import *
from protocol.src.com.teltonika.TCPlistener.insert_into_tbl import *



class GPSElement:
       def __init__(self,GPSElement,imei):
          self.GPSElement = GPSElement
          self.imei = int(imei)
          #self.cursor, self.conn = dbConn.connect_to_db(self)
          #cursor, conn = dbConn.connect_to_db(self)



       def GPSElement_splitter(self):
           GPSElement = self.GPSElement
           IMEI = self.imei
           #_cursor = self.cursor
           #_conn = self.conn




           Longitude = GPSElement[:8]
           print("Longitude", Longitude)

           my_longitude = twos_complement(Longitude,16)
           Longitude_value = my_longitude.twos_complement()


           if (Longitude_value > 0):
               print("Longitude is in east direction")
               Longitude_value = (Longitude_value) * 0.0000001
               print("Longitude_value", Longitude_value)
               if (-180<Longitude_value<180):
                    print("correct range")
               else:
                    print("wrong range")
               #

           else:
               print("Longitude is in west direction")
               Longitude_value =  (Longitude_value)* (-0.0000001)
               print("Longitude_value",(Longitude_value))
               if (-180 < Longitude_value < 180):
                    print("correct range")
               else:
                    print("wrong range")

           Latitude = GPSElement[8:16]
           print("latitude", Latitude)

           my_latitude = twos_complement(Latitude,16)
           Latitude_value = my_latitude.twos_complement()
           #print("longitude type",type(Latitude_value))


           if (Latitude_value > 0):
               print("Latitude is in north direction")
               (Latitude_value) = (Latitude_value) * 0.0000001
               print("Latitude_value", (Latitude_value))
               if (-90 < Latitude_value < 90):
                    print("correct range")
               else:
                    print("wrong range")
           else:
               print("Latitude is in south direction")
               (Longitude_value) = (Longitude_value) * (-0.0000001)
               print("Latitude_value", (Longitude_value))
               if (-90 < Latitude_value < 90):
                    print("correct range")
               else:
                   print("wrong range")


           Altitude = GPSElement[16:20]
           Altitude_in_Decimal = int(Altitude, 16)
           Angle = GPSElement[20:24]
           Angle_In_Decimal = int(Angle, 16)

           Satellite = GPSElement[24:26]
           Satellite_in_Decimal = int(Satellite,16)
           Speed = GPSElement[26:30]
           speed_in_decimal = int(Speed,16)
           cursor, conn = dbConn.connect_to_db(self)
           now = datetime.now()
           GPS_time = now.strftime("%d %b %Y, %I:%M:%S.%f")
           #print(type(GPS_time))
           print("imei", IMEI)
           #a = insert_into_tbl(cursor, conn)
           #a.insert_into_Live_map(IMEI,GPS_time,Longitude_value,Latitude_value,Altitude_in_Decimal,Angle_In_Decimal,Satellite_in_Decimal,speed_in_decimal)


           print("Altitude", Altitude)
           print("Altitude_in_decimal",Altitude_in_Decimal)
           print("Angle_In_Decimal_from north pole", Angle_In_Decimal)
           print("Angle", Angle)
           print("Satellite", Satellite)
           print("Satellite_in_Decimal",Satellite_in_Decimal)
           print("Speed", Speed)
           print("Speed_in_decimal",speed_in_decimal)
           print("============================================")

           return Longitude_value,Latitude_value,Altitude_in_Decimal,Angle_In_Decimal,Satellite_in_Decimal,speed_in_decimal


















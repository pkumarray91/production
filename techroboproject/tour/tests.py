from django.test import TestCase

# Create your tests here.
from math import sin, cos, radians, degrees, acos

def calc_dist(lat_a, long_a, lat_b, long_b):
     lat_a = radians(lat_a)
     lat_b = radians(lat_b)
     long_diff = radians(long_a - long_b)
     distance = (sin(lat_a) * sin(lat_b) +
                 cos(lat_a) * cos(lat_b) * cos(long_diff))
     resToMile = degrees(acos(distance)) * 69.09
     resToMt = resToMile / 0.00062137119223733
     resTokm=resToMt/1000
     return resTokm

result=calc_dist(18.5204,73.8567,19.9975,73.7898)
print("distance in km:",result)
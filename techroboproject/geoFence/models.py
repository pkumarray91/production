from django.db import models


# Create your models here.


class Geolocation(models.Model):
    # circle=models.ForeignKey(Circle,on_delete=models.CASCADE)
    # rectangle = models.ForeignKey(Rectangle, on_delete=models.CASCADE)

    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200, null=True, blank=True)
    latitude = models.CharField(max_length=200, null=True, blank=True)
    longitude = models.CharField(max_length=200, null=True, blank=True)
    fillColor = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    c_radius = models.CharField(max_length=200, null=True, blank=True)
    c_lat = models.CharField(max_length=200, null=True, blank=True)
    c_lng = models.CharField(max_length=200, null=True, blank=True)
    r_lat1 = models.CharField(max_length=200, null=True, blank=True)
    r_lng1 = models.CharField(max_length=200, null=True, blank=True)
    r_lat2 = models.CharField(max_length=200, null=True, blank=True)
    r_lng2 = models.CharField(max_length=200, null=True, blank=True)
    r_lat3 = models.CharField(max_length=200, null=True, blank=True)
    r_lng3 = models.CharField(max_length=200, null=True, blank=True)
    r_lat4 = models.CharField(max_length=200, null=True, blank=True)
    r_lng4 = models.CharField(max_length=200, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
# class Circle(models.Model):
#     circle = models.ForeignKey(Geolocation, on_delete=models.CASCADE, related_name='circle_geo', null=True, blank=True)
#     radius = models.CharField(max_length=200)
#     latitude = models.CharField(max_length=200)
#     longtiude = models.CharField(max_length=200)
#
#
# class Rectangle(models.Model):
#     rectangle = models.ForeignKey(Geolocation, on_delete=models.CASCADE, related_name='rectangle_geo', null=True,
#                                   blank=True)
#     lat1 = models.CharField(max_length=200)
#     long1 = models.CharField(max_length=200)
#     lat2 = models.CharField(max_length=200)
#     long2 = models.CharField(max_length=200)
#     lat3 = models.CharField(max_length=200)
#     long3 = models.CharField(max_length=200)
#     lat4 = models.CharField(max_length=200)
#     long4 = models.CharField(max_length=200)

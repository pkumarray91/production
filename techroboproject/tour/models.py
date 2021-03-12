from django.utils import timezone
from django.db import models
#from sapaslogin.models import tblgroup,tblvehicle

class TourCreation(models.Model):
    tour_name=models.CharField(max_length=200,null=True,blank=True)
    #group_id=models.CharField(max_length=200,null=True,blank=True)
    start_point=models.CharField(max_length=200,null=True,blank=True)
    end_point = models.CharField(max_length=200,null=True,blank=True)
    stops=models.CharField(max_length=200,null=True,blank=True)
    distance=models.CharField(max_length=200,null=True,blank=True)
    duration=models.CharField(max_length=200,null=True,blank=True)
    total_time=models.CharField(max_length=200,null=True,blank=True)
    is_deleted=models.BooleanField(default=False)
    create_date_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tour_name


class StartPoint(models.Model):
    start_address= models.ForeignKey(TourCreation,on_delete=models.CASCADE,related_name='start_lat_lng',null=True,blank=True)
    lat = models.FloatField()
    lng = models.FloatField()
    is_deleted=models.BooleanField(default=False)


class EndPoint(models.Model):
    end_address = models.ForeignKey(TourCreation,on_delete=models.CASCADE,related_name='end_lat_lng',null=True,blank=True)
    lat = models.FloatField()
    lng = models.FloatField()
    is_deleted=models.BooleanField(default=False)


class TourAllocate(models.Model):
    tour_allocate_name=models.CharField(max_length=200,null=True,blank=True)
    Tour_Name= models.ForeignKey(TourCreation,on_delete=models.CASCADE)
    Vehicle_data=models.CharField(max_length=200,null=True,blank=True)
    Date_allocate=models.CharField(max_length=200,null=True,blank=True)
    Time_allocate=models.CharField(max_length=200,null=True,blank=True)
    is_deleted = models.BooleanField(default=False)





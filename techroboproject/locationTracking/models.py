from django.db import models
#from fontawesome_5.fields import IconField
# Create your models here.


class tblVehicleData(models.Model):
    status_choices = (
            ('Moving','Moving'),
            ('Idle', 'Idle'),
            ('Parking', 'Parking')
        )
    icon_list=(
        ('Rikshaw','Rikshaw'),
        ('Car','Car'),
        ('Scooter','Scooter'),
        ('Truck','Truck'),
        ('Bike','Bike'),
        ('LargeTruck','LargeTruck')
    )
    iconmarker_list=(
        ('RikshawMarker','RikshawMarker'),
        ('CarMarker','CarMarker'),
        ('ScooterMarker','ScooterMarker'),
        ('TruckMarker','TruckMarker'),
        ('BikeMarker','BikeMarker'),
        ('LargeTruckMarker','LargeTruckMarker')
    )
    vehicle_status = models.CharField(max_length=100,choices=status_choices)
    speed = models.CharField(max_length=10)
    vehicle_number = models.CharField(max_length=10)
    date_time = models.DateTimeField(auto_now=True,null=True,blank=True)
    current_location = models.CharField(max_length=500)
    end_point = models.CharField(max_length=500)
    icon = models.CharField(max_length=100,choices=icon_list,default ='Truck')
    icon_marker = models.CharField(max_length=100,choices=iconmarker_list,default ='TruckMarker')

    def __str__(self):
        return self.vehicle_number


class tblCoordinates(models.Model):
    vehicle_data = models.ForeignKey(tblVehicleData, on_delete=models.CASCADE, related_name='position', null=True, blank=True)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)

    def __str__(self):
        return self.latitude
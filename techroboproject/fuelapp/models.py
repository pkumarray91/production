from django.db import models
# Create your models here.

from sapaslogin.models import tbldevice,tblallocatedeallocate

# class TblFuelMgmt(models.Model):
#     class Meta:
#         db_table='fuel_mgmt'
#
#     fuel_mgmt_id=models.AutoField(primary_key=True)
#     allocateddeallocate=models.ForeignKey(tblallocatedeallocate,on_delete=models.CASCADE)
#     sensor=models.ForeignKey(tbldevice,on_delete=models.CASCADE)
#     tank_capacity=models.IntegerField()
#     date_added=models.DateTimeField(auto_now_add=True)
#     comments=models.CharField(max_length=255,null=True,blank=True)
#     is_deleted = models.BooleanField(default=False)
#
#     def __str__(self):
#         return str(self.fuel_mgmt_id)
#
# class TblFuelStatus(models.Model):
#     class Meta:
#         db_table='FUEL_STATUS'
#
#     fuel_status_id=models.AutoField(primary_key=True)
#     fuel_mgmt_id = models.ForeignKey(TblFuelMgmt,on_delete=models.CASCADE)
#     fuel_level = models.IntegerField()
#     volts=models.FloatField()
#     avl_time=models.DateTimeField(auto_now_add=True)
#     insert_time=models.DateTimeField(auto_now_add=True)
#     comments=models.CharField(max_length=200,null=True,blank=True)
#     is_deleted = models.BooleanField(default=False)
#
#     def __str__(self):
#         return str(self.fuel_status_id)
#
# class FuelCalibrationData(models.Model):
#     class Meta:
#         db_table='FUEL_CALIBRATION_DATA'
#
#     fuel_calibration_data_id=models.AutoField(primary_key=True)
#     fuel_mgmt_id=models.ForeignKey(TblFuelMgmt,on_delete=models.CASCADE)
#     from_volt=models.FloatField()
#     to_volt=models.FloatField()
#     from_fuel=models.IntegerField()
#     to_fuel=models.IntegerField()
#
#     def __str__(self):
#         return str(self.fuel_calibration_data_id)

# class FuelChartData(models.Model):
#     companyName=models.CharField(max_length=100)
#     branch=models.CharField(max_length=100)
#     vehicleNo=models.CharField(max_length=100)
#     fromDate=models.DateTimeField()
#     ToDate=models.DateTimeField()
#     def __str__(self):
#         return self.companyName
#
# class displaychartData(models.Model):
#
#     fuelconsumpation=models.DecimalField(max_digits=19, decimal_places=10)
#     date=models.DateTimeField(auto_now_add=True)
#
#
# class HoverChartdata(models.Model):
#     vehicleno=models.CharField(max_length=100)
#     voltage=models.DecimalField(max_digits=19, decimal_places=10)
#     fuelLeft=models.CharField(max_length=40)
#     distance=models.DecimalField(max_digits=19, decimal_places=10)
#     speed=models.CharField(max_length=20)
#     igntion_choice=(
#           ("ON", "ON"),
#           ("OFF", "OFF"),
#          )
#     ignition_type=models.CharField(max_length=10,choices=igntion_choice)
#     location=models.CharField(max_length=150)
#     def __str__(self):
#         return self.vehicleno
#
#
# class FuelStatusdata(models.Model):
#     status_CHOICES = (
#         ("Idle", "Idle"),
#         ("Moving", "Moving"),
#         ("Stop", "Stop"),
#     )
#     vehicle_status=models.CharField(max_length=50,choices=status_CHOICES)
#     vehicleNo=models.CharField(max_length=100)
#     location=models.CharField(max_length=100)
#     port=models.CharField(max_length=100)
#     tankNo=models.CharField(max_length=100)
#     tankCapacity=models.DecimalField(max_digits=19, decimal_places=10)
#     last_date=models.DateTimeField(auto_now_add=True)
#     fuel_left=models.DecimalField(max_digits=19, decimal_places=10)
#     def __str__(self):
#         return self.vehicleNo
#
# class VehicleData(models.Model):
#     vehicleNo=models.CharField(max_length=100,primary_key=True)
#
# class ChartData(models.Model):
#     vehicle=models.ForeignKey(VehicleData,on_delete=models.CASCADE)
#     fuelLevel= models.CharField(max_length=100)
#     Date=models.DateTimeField(auto_now=True)
#     def _str_(self):
#         return self.vehicle
#
# class Chart(models.Model):
#     Playername=models.DateField(auto_now=True)
#     Runscore=models.IntegerField()
#     def __str__(self):
#         return str(self.Runscore)
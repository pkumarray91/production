from django.db import models


#  Create your models here.
# class tblCoordinates(models.Model):
#     latitude = models.CharField(max_length=100)
#     longitude = models.CharField(max_length=100)
#
#     def __str__(self):
#         return self.latitude
#
#
#
#
#
#
#
#
# # Create your models here.
# class tblcountries(models.Model):
#     country_code=models.CharField(primary_key=True,max_length=3)
#     name=models.CharField(max_length=100)
#     continent_name=models.CharField(max_length=100)
#     created_at=models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.name
#
# class tbladdress(models.Model):
#     country_code = models.ForeignKey(tblcountries, on_delete=models.CASCADE)
#     address_id=models.IntegerField(primary_key=True)
#     address1=models.TextField(null=True,blank=True)
#     address2=models.TextField(blank=True,null=True)
#     city=models.CharField(max_length=40)
#     state=models.CharField(max_length=40)
#     zip_code=models.CharField(max_length=30)
#     created_at=models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.state
#
# class tblurl(models.Model):
#     url=models.URLField(max_length=100,primary_key=True)
#     serverIP=models.CharField(max_length=100,null=True,blank=True)
#     api_key=models.CharField(max_length=50,null=True,blank=True)
#     help_url=models.URLField(max_length=100,null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.serverIP
#
#
# class tblreseller(models.Model):
#     reseller_id=models.IntegerField(primary_key=True)
#     reseller_url=models.ForeignKey(tblurl,on_delete=models.CASCADE)
#     reseller_name=models.CharField(max_length=100)
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     created_at=models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.reseller_name
#
# class tblcompany(models.Model):
#     company_id=models.IntegerField(primary_key=True)
#     name=models.CharField(max_length=100)
#     reseller=models.ForeignKey(tblreseller,on_delete=models.CASCADE)
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     currency=models.CharField(max_length=100)
#     language=models.CharField(max_length=100)
#     region=models.CharField(max_length=100)
#     created_at=models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.name
#
# class tbluser(models.Model):
#     user_id= models.AutoField(primary_key=True)
#     name=models.CharField(max_length=100)
#     password=models.CharField(max_length=100)
#     email_address=models.EmailField(unique=True)
#
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     user_type=models.CharField(max_length=20)
#     refernce_id=models.IntegerField()
#     admin_role=models.BinaryField(default=False)
#     status=models.BinaryField(default=False,null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.name
#
# class tblvehicletype(models.Model):
#     vehicle_type=models.IntegerField(primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     vehicle_name=models.CharField(max_length=100)
#     descr=models.TextField(max_length=200,null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.vehicle_name
#
# class tblgroup(models.Model):
#     group_id=models.IntegerField(primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     group_name=models.CharField(max_length=100)
#     status=models.IntegerField(null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.group_name
#
# class tbldriver(models.Model):
#     driver_id=models.IntegerField(primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     driver_name=models.CharField(max_length=100)
#     RFID_ibutton=models.CharField(max_length=100,unique=True)
#     driver_id_number=models.CharField(max_length=100)
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     phone=models.BigIntegerField()
#     email=models.EmailField(unique=True)
#     descr=models.TextField(max_length=200)
#     status=models.IntegerField()
#     hire_date=models.DateField()
#     created_at=models.DateTimeField(auto_created=True)
#
#     def __str__(self):
#         return self.driver_name
#
# class tblpassengers(models.Model):
#     passenger_id=models.IntegerField(primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     passenger_name=models.CharField(max_length=100)
#     passenger_id_number=models.CharField(max_length=100)
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     phone=models.BigIntegerField()
#     email=models.EmailField(unique=True)
#     descr=models.TextField(max_length=200)
#     status=models.IntegerField()
#     hire_date=models.DateField()
#     created_at=models.DateTimeField(auto_created=True)
#
#     def __str__(self):
#         return self.passenger_name
#
#
#
# class tbltrailers(models.Model):
#     trailer_id=models.IntegerField(primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     name=models.CharField(max_length=100)
#     desc=models.TextField(max_length=200,null=True,blank=True)
#     status=models.IntegerField(null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.name
#
#
# class tblvehicle(models.Model):
#     vehicle_id=models.CharField(max_length=50,primary_key=True)
#     company=models.ForeignKey(tblcompany,on_delete=models.CASCADE)
#     vehicle_name=models.CharField(max_length=100)
#     vehicle_type=models.ForeignKey(tblvehicletype,on_delete=models.CASCADE)
#     IMEI=models.CharField(max_length=100,unique=True)
#     transportModel=models.CharField(max_length=100,null=True,blank=True)
#     GPS_device=models.CharField(max_length=50,null=True,blank=True)
#     sim=models.CharField(max_length=50,null=True,blank=True)
#     vin=models.CharField(max_length=50,null=True,blank=True)
#     plate_number=models.CharField(max_length=50,null=True,blank=True)
#     address=models.ForeignKey(tbladdress,on_delete=models.CASCADE)
#     group=models.ForeignKey(tblgroup,on_delete=models.CASCADE)
#     driver=models.ForeignKey(tbldriver,on_delete=models.CASCADE)
#     passenger=models.ForeignKey(tblpassengers,on_delete=models.CASCADE)
#     trailer=models.ForeignKey(tbltrailers,on_delete=models.CASCADE)
#     status=models.BinaryField(default=0)
#     expiry_date=models.DateField(auto_now=False)
#     start_ordometer_reading=models.IntegerField(null=True,blank=True)
#     odometer_counter=models.CharField(max_length=100,null=True,blank=True)
#     current_odometer_reading=models.IntegerField(null=True,blank=True)
#     start_engin_hours = models.IntegerField(null=True, blank=True)
#     engine_counters=models.CharField(max_length=100,null=True,blank=True)
#     current_engin_hours=models.IntegerField(null=True,blank=True)
#     created_at=models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.vehicle_name
#
#
#

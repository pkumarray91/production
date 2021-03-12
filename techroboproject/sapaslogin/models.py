from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# first way to design sapas telematics table
class tblurl(models.Model):
    class Meta:
        db_table='tblurl'

    url = models.URLField(max_length=100, primary_key=True)
    serverIP = models.CharField(max_length=100, null=True, blank=True)
    api_key = models.CharField(max_length=50, null=True, blank=True)
    help_url = models.URLField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url


class tblcountries(models.Model):
    country_code = models.CharField(primary_key=True, max_length=3)
    name = models.CharField(max_length=100)
    continent_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class tbladdress(models.Model):
    country_code = models.ForeignKey(tblcountries, on_delete=models.CASCADE, null=True, blank=True)
    address_id = models.IntegerField(primary_key=True)
    address1 = models.TextField(blank=True, null=True)
    address2 = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=40)
    zip_code = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.state


class tblreseller(models.Model):
    class Meta:
        db_table='tblreseller'

    reseller_id = models.AutoField(primary_key=True)
    reseller_url = models.OneToOneField(tblurl, on_delete=models.CASCADE, null=True, blank=True)
    reseller_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    address = models.ForeignKey(tbladdress, on_delete=models.CASCADE, null=True, blank=True)
    reseller_image=models.ImageField()
    created_at = models.DateTimeField(auto_now=True)
    contact_number = models.CharField(max_length=20,null=True,blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.reseller_id)


class tblcompany(models.Model):
    class Meta:
        db_table='Tblcompany'

    company_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15, null=True, blank=True)
    reseller = models.ForeignKey(tblreseller, on_delete=models.CASCADE,null=True, blank=True)
    address = models.ForeignKey(tbladdress, on_delete=models.CASCADE, null=True, blank=True)
    currency = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.company_id)




class tblgroup(models.Model):
    class Meta:
        db_table='tblgroup'

    group_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(tblcompany, on_delete=models.CASCADE, null=True, blank=True)
    group_name = models.CharField(max_length=100, null=True, blank=True)
    status = models.IntegerField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.group_id)


class tbldriver(models.Model):
    driver_id = models.IntegerField(primary_key=True)
    company = models.ForeignKey(tblcompany, on_delete=models.CASCADE)
    group = models.ForeignKey(tblgroup, on_delete=models.CASCADE, null=True, blank=True)
    driver_name = models.CharField(max_length=100)
    RFID_ibutton = models.CharField(max_length=100, unique=True, null=True, blank=True)
    driver_id_number = models.CharField(max_length=100)
    address = models.ForeignKey(tbladdress, on_delete=models.CASCADE, null=True, blank=True)
    phone = models.BigIntegerField()
    email = models.EmailField(unique=True)
    descr = models.TextField(max_length=200)
    status = models.IntegerField()
    hire_date = models.DateField()
    created_at = models.DateTimeField(auto_created=True)

    def __str__(self):
        return self.driver_name

class tbldevice(models.Model):
    class Meta:
        db_table='DEVICE_TBL'

    device_id = models.AutoField(primary_key=True)
    reseller = models.ForeignKey(tblreseller, on_delete=models.CASCADE, null=True, blank=True)
    device_name = models.CharField(max_length=255)
    GSM_number = models.CharField(max_length=200, null=True,blank=True)
    ICCID_number = models.CharField(max_length=200, null=True,blank=True)
    IMEI_number = models.BigIntegerField()
    device_type_CHOICES = (
        ("tracking device", "tracking device"),
        ("fuel sensor", "fuel sensor"),
        ("temperature sensor", "temperature sensor")
    )
    device_type = models.CharField(max_length=255, choices=device_type_CHOICES, default="tracking device")
    available = models.CharField(max_length=10, default="Yes")
    comments=models.CharField(max_length=255,null=True,blank=True)
    date_added=models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    def str(self):
        return str(self.device_id)

class tblvehicle(models.Model):
    class Meta:
        db_table='VEHICLE_TBL'

    vehicle_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(tblcompany, on_delete=models.CASCADE,null=True)
    vehicle_number = models.CharField(max_length=100)
    vehicle_icons = models.CharField(max_length=200, null=True, blank=True)
    vehicle_marker = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True,null=True)
    is_deleted = models.BooleanField(default=False)

    def str(self):
        return str(self.vehicle_id)

class tblallocatedeallocate(models.Model):
    class Meta:
        db_table='ALLOCATION_DEALLOCATION_TABLE'

    allocate_deallocate_id=models.AutoField(primary_key=True)
    vehicle=models.ForeignKey(tblvehicle,on_delete=models.CASCADE,null=True,blank=True,)
    device=models.ForeignKey(tbldevice,on_delete=models.CASCADE,null=True,blank=True)
    allocate_on=models.DateTimeField(auto_now=True)
    deallocate_on=models.DateTimeField(null=True, blank=True)
    add_notes = models.TextField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    def str(self):
        return str(self.allocate_deallocate_id)

class Audit(models.Model):
    class Meta:
        db_table = 'Audit'
    file = models.FileField(upload_to='csvs', blank=False, null=False)
    upload_timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"File id: {self.id}"

class TblFuelMgmt(models.Model):
    class Meta:
        db_table='fuel_mgmt'

    fuel_mgmt_id=models.AutoField(primary_key=True)
    allocateddeallocate=models.ForeignKey(tblallocatedeallocate,on_delete=models.CASCADE)
    sensor=models.ForeignKey(tbldevice,on_delete=models.CASCADE,)
    tank_capacity=models.IntegerField()
    date_added=models.DateTimeField(auto_now_add=True)
    comments=models.CharField(max_length=255,null=True,blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.fuel_mgmt_id)

class TblFuelStatus(models.Model):
    class Meta:
        db_table='FUEL_STATUS'

    fuel_status_id=models.AutoField(primary_key=True)
    fuel_mgmt_id = models.ForeignKey(TblFuelMgmt,on_delete=models.CASCADE)
    fuel_level = models.IntegerField()
    volts=models.FloatField()
    avl_time=models.DateTimeField(auto_now_add=True)
    insert_time=models.DateTimeField(auto_now_add=True)
    comments=models.CharField(max_length=200,null=True,blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.fuel_status_id)

class FuelCalibrationData(models.Model):
    class Meta:
        db_table='FUEL_CALIBRATION_DATA'

    fuel_calibration_data_id=models.AutoField(primary_key=True)
    fuel_mgmt=models.ForeignKey(TblFuelMgmt,on_delete=models.CASCADE)
    from_volt=models.FloatField()
    to_volt=models.FloatField()
    from_fuel=models.IntegerField()
    to_fuel=models.IntegerField()

    def __str__(self):
        return str(self.fuel_calibration_data_id)

class tblLocationTracking(models.Model):
    Vehicle=models.ForeignKey(tblvehicle,on_delete=models.CASCADE,related_name='locationtracking')
    Receive_Time=models.DateTimeField(auto_now_add=True)
    Longitude=models.IntegerField()
    Latitude=models.IntegerField()
    Altitude=models.IntegerField()
    Angle=models.IntegerField()
    Satellites=models.IntegerField()
    Speed=models.CharField(max_length=200)
    Formatted_address=models.CharField(max_length=200)
    Geometery_latitude=models.FloatField()
    Geometery_longitude=models.FloatField()
    Location_type=models.CharField(max_length=200,null=True,blank=True)
    Place_Id=models.CharField(max_length=200,null=True,blank=True)

    def __str__(self):
        return str(self.Vehicle)

class User(AbstractUser):
    username=models.CharField(max_length=200,null=True,blank=True)
    email = models.EmailField('email address', unique=True)
    first_name = models.CharField('First Name', max_length=255, blank=True, null=False)
    last_name = models.CharField('Last Name', max_length=255, blank=True, null=False)
    user_url = models.ForeignKey(tblurl, on_delete=models.CASCADE, null=True, blank=True)
    category_type_CHOICES = (
        ("1", "admin"),
        ("2", "sales"),
        ("3", "marketing")
    )
    category_type = models.CharField(max_length=20, choices=category_type_CHOICES, default='0')
    user_CHOICES = (
        ("1", "Reseller"),
        ("2", "company"),
        ("3", "group"),
        ("4", "driver"),
    )
    user_type = models.CharField(max_length=20, choices=user_CHOICES, default='0')
    reseller_choices = (
        ('CT', 'CT'),
        ('MT', 'MT'),
        ('PT', 'PT'),
    )
    contact_number = models.CharField(max_length=15, null=True, blank=True)
    reseller = models.ForeignKey(tblreseller, on_delete=models.CASCADE, null=True, blank=True)
    reseller_type = models.CharField(max_length=200, choices=reseller_choices, default='0')
    company = models.ForeignKey(tblcompany, on_delete=models.CASCADE, null=True, blank=True)
    group = models.ForeignKey(tblgroup, on_delete=models.CASCADE, null=True, blank=True)
    driver = models.ForeignKey(tbldriver, on_delete=models.CASCADE, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','contact_number']

    def __str__(self):
        return self.email


############################## Protocol Tables ##########################################################33

class TblRawMessage(models.Model):
    class Meta:
        db_table='TblRawMessage'

    raw_id=models.AutoField(primary_key=True)
    socket_receive_time=models.DateTimeField(auto_now_add=True)
    thread_send_time=models.DateTimeField(auto_now_add=True)
    kafka_read_time=models.DateTimeField(auto_now_add=True)
    kafka_publish_time=models.DateTimeField(auto_now_add=True)
    IMEI=models.CharField(max_length=255)
    IMEI_Num=models.BigIntegerField()
    raw_data_hexa=models.CharField(max_length=8192)
    def __str__(self):
        return str(self.raw_id)


class MainTable(models.Model):
    class Meta:
        db_table='MainTable'

    maintableid=models.AutoField(primary_key=True)
    raw_id=models.ForeignKey(TblRawMessage,on_delete=models.CASCADE)
    IMEI = models.CharField(max_length=255)
    preamble_size=models.BigIntegerField()
    preamble_value=models.BigIntegerField()
    preamble_hexvalue=models.CharField(max_length=255)
    avl_data_length_size=models.BigIntegerField()
    avl_data_length_value=models.BigIntegerField()
    avl_data_length_hexvalue=models.CharField(max_length=255)
    crc_size=models.BigIntegerField()
    crc_value=models.BigIntegerField()
    crc_hexvalue=models.CharField(max_length=255)

    def __str__(self):
        return str(self.maintableid)


class DataTable(models.Model):
    class Meta:
        db_table='DataTable'

    data_id=models.AutoField(primary_key=True)
    maintableid=models.ForeignKey(MainTable,on_delete=models.CASCADE)
    raw_id=models.BigIntegerField()
    IMEI=models.BigIntegerField()
    codec_id_size=models.BigIntegerField()
    codec_id_value=models.BigIntegerField()
    codec_id_hexvalue=models.CharField(max_length=20)
    start_avl_data_count_size=models.BigIntegerField()
    start_avl_data_count_value=models.BigIntegerField()
    start_avl_data_count_hexvalue=models.CharField(max_length=20)
    avl_data=models.CharField(max_length=8192)
    end_avl_data_count_size=models.BigIntegerField()
    end_avl_data_count_value=models.BigIntegerField()
    end_avl_data_count_hexvalue=models.CharField(max_length=20)

    def __str__(self):
        return str(self.data_id)


class AvlTable(models.Model):
    class Meta:
        db_table='AvlTable'

    avl_id=models.AutoField(primary_key=True)
    data_id=models.ForeignKey(DataTable,on_delete=models.CASCADE)
    maintableid=models.BigIntegerField()
    raw_id=models.BigIntegerField()
    IMEI=models.BigIntegerField(null=True,blank=True)
    timestamp_size=models.BigIntegerField()
    timestamp_value=models.DateTimeField(auto_now_add=True)
    timestamp_hex=models.CharField(max_length=255)
    priority_size=models.BigIntegerField()
    priority_value=models.BigIntegerField()
    priority_hex=models.CharField(max_length=255)
    no_of_gpselement=models.BigIntegerField()
    longitude_size=models.BigIntegerField()
    longitude_value = models.BigIntegerField()
    longitude_hex= models.CharField(max_length=255)
    latitude_size=models.BigIntegerField()
    latitude_value = models.BigIntegerField()
    latitude_hex = models.CharField(max_length=255)
    altitude_size=models.BigIntegerField()
    altitude_value = models.BigIntegerField()
    altitude_hex = models.CharField(max_length=255)
    angle_size=models.BigIntegerField()
    angle_value=models.BigIntegerField()
    angle_hex=models.CharField(max_length=255)
    satellite_size=models.BigIntegerField()
    satellite_value=models.BigIntegerField()
    satellite_hex=models.CharField(max_length=255)
    speed_size=models.BigIntegerField()
    speed_value=models.BigIntegerField()
    speed_hex=models.CharField(max_length=255)

    def __str__(self):
        return str(self.avl_id)

class AVLID_TABLE(models.Model):
    class Meta:
        db_table='AVLID_TABLE'

    property_id_in_avl_packet=models.CharField(max_length=4000)
    property_name=models.CharField(max_length=4000)
    bytes=models.CharField(max_length=4000)
    type=models.CharField(max_length=4000)
    value_range_min=models.CharField(max_length=4000)
    value_range_max=models.CharField(max_length=4000)
    multiplier=models.CharField(max_length=4000)
    units=models.CharField(max_length=4000)
    data=models.CharField(max_length=4000)
    description=models.CharField(max_length=4000)
    parameter_group=models.CharField(max_length=4000)

    def __str__(self):
        return str(self.property_id_in_avl_packet)

class IO_Element(models.Model):
    class Meta:
        db_table='IO_Element'

    IO_number=models.AutoField(primary_key=True)
    avl_id=models.ForeignKey(AvlTable,on_delete=models.CASCADE)
    data_id=models.BigIntegerField()
    maintableid=models.BigIntegerField()
    raw_id=models.BigIntegerField()
    IMEI=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    oneb_element_count=models.BigIntegerField()
    twob_element_count=models.BigIntegerField()
    fourb_element_count=models.BigIntegerField()
    Eightb_element_count=models.BigIntegerField()
    xb_element_count=models.BigIntegerField(null=True,blank=True)

    def __str__(self):
        return str(self.IO_number)


class OneB_Element(models.Model):
    class Meta:
        db_table='OneB_Element'

    OneB_id=models.AutoField(primary_key=True)
    Io_number=models.ForeignKey(IO_Element,on_delete=models.CASCADE)
    data_id = models.BigIntegerField()
    maintableid = models.BigIntegerField()
    raw_id = models.BigIntegerField()
    avl_id=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    Id_size=models.BigIntegerField()
    Id_value=models.BigIntegerField()
    Id_hexvalue=models.CharField(max_length=255)
    value_size=models.BigIntegerField()
    value_dec=models.BigIntegerField()
    value_hexvalue=models.CharField(max_length=255)
    value_after_multiplication=models.FloatField()

    def __str__(self):
        return self.OneB_id


class TwoB_Element(models.Model):
    class Meta:
        db_table='TwoB_Element'

    TwoB_id=models.AutoField(primary_key=True)
    Io_number=models.ForeignKey(IO_Element,on_delete=models.CASCADE)
    data_id = models.BigIntegerField()
    maintableid = models.BigIntegerField()
    raw_id = models.BigIntegerField()
    avl_id=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    Id_size=models.BigIntegerField()
    Id_value=models.BigIntegerField()
    Id_hexvalue=models.CharField(max_length=255)
    value_size=models.BigIntegerField()
    value_dec=models.BigIntegerField()
    value_hexvalue=models.CharField(max_length=255)
    value_after_multiplication=models.FloatField()

    def __str__(self):
        return self.TwoB_id


class FourB_Element(models.Model):
    class Meta:
        db_table='FourB_Element'

    FourB_id=models.AutoField(primary_key=True)
    Io_number=models.ForeignKey(IO_Element,on_delete=models.CASCADE)
    data_id = models.BigIntegerField()
    maintableid = models.BigIntegerField()
    raw_id = models.BigIntegerField()
    avl_id=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    Id_size=models.BigIntegerField()
    Id_value=models.BigIntegerField()
    Id_hexvalue=models.CharField(max_length=255)
    value_size=models.BigIntegerField()
    value_dec=models.BigIntegerField()
    value_hexvalue=models.CharField(max_length=255)
    value_after_multiplication=models.FloatField()

    def __str__(self):
        return self.FourB_id


class EightB_Element(models.Model):
    class Meta:
        db_table='EightB_Element'

    EightB_id=models.AutoField(primary_key=True)
    Io_number=models.ForeignKey(IO_Element,on_delete=models.CASCADE)
    data_id = models.BigIntegerField()
    maintableid = models.BigIntegerField()
    raw_id = models.BigIntegerField()
    avl_id=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    Id_size=models.BigIntegerField()
    Id_value=models.BigIntegerField()
    Id_hexvalue=models.CharField(max_length=255)
    value_size=models.BigIntegerField()
    value_dec=models.BigIntegerField()
    value_hexvalue=models.CharField(max_length=255)
    value_after_multiplication=models.FloatField()

    def __str__(self):
        return self.EightB_id


class XB_Element(models.Model):
    class Meta:
        db_table='XB_Element'

    XB_id=models.AutoField(primary_key=True)
    Io_number=models.ForeignKey(IO_Element,on_delete=models.CASCADE)
    data_id = models.BigIntegerField()
    maintableid = models.BigIntegerField()
    raw_id = models.BigIntegerField()
    avl_id=models.BigIntegerField()
    event_id_size=models.BigIntegerField()
    event_id_value=models.BigIntegerField()
    event_id_hexvalue=models.CharField(max_length=255)
    element_count_size=models.BigIntegerField()
    element_count_value=models.BigIntegerField()
    element_count_hexvalue=models.CharField(max_length=255)
    origin_type_hexvalue=models.CharField(max_length=255,null=True,blank=True)
    origin_type_size=models.BigIntegerField(null=True,blank=True)
    origin_value=models.BigIntegerField(null=True,blank=True)
    Id_size=models.BigIntegerField()
    Id_value=models.BigIntegerField()
    Id_hexvalue=models.CharField(max_length=255)
    value_size=models.BigIntegerField()
    value_dec=models.BigIntegerField()
    value_hexvalue=models.CharField(max_length=255)
    value_after_multiplication=models.FloatField()

    def __str__(self):
        return self.XB_id
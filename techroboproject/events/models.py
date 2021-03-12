from django.db import models

# Create your models here.
#from GPS.models import (tblvehicletype, tbladdress)


class tblMain(models.Model):
    types = (
        ('overspeed', 'overspeed'),
        ('moving', 'moving'),
        ('underspeed', 'underspeed'),
        ('stopped', 'stopped'),
        ('route_in', 'route_in'),
        ('route_out', 'route_out'),
        ('zone_in', 'zone_in'),
        ('harsh braking', 'harsh braking'),
        ('driver change', 'drive change'),
    )

    depending_on_routes = (
        ('off', 'off'),
        ('In selected routes', 'In selected routes'),
        ('Out of selected routes', 'Out of selected routes')

    )

    depending_on_zones = (
        ('off', 'off'),
        ('In selected zones', 'In selected zones'),
        ('Out of selected zones', 'Out of selected zones')

    )
    zones = (
        ('Bialystok', 'Bialystok'),
        ('Coventry', 'Coventry'),
        ('Goole', 'Goole'),
        ('Heywood', 'Heywood'),
        ('Ostrow', 'Ostrow'),
        ('Preston', 'Preston'),
        ('Veino', 'Veino'),
        ('Warsaw', 'Warsaw')
    )
    Active = models.BooleanField()
    Name = models.CharField(max_length=100)
    Type = models.CharField(max_length=100, choices=types)
    #Vehicletype = models.ForeignKey(tblvehicletype, on_delete=models.CASCADE)
    Depending_on_routes = models.CharField(max_length=100, choices=depending_on_routes)
    Depending_on_zones = models.CharField(max_length=100, choices=depending_on_zones)
    Zones = models.CharField(max_length=100, choices=zones)
    Time_period = models.TimeField()
    speed_limit = models.IntegerField()

    def __str__(self):
        return self.Name

class tblWeekDay(models.Model):
    week_day = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday')
    )
    weekday= models.CharField(max_length=100, choices=week_day)

    def __str__(self):
        return self.weekday


class tblTime(models.Model):
    Duration_form_last_event_in_minutes = models.IntegerField()
    tblweekday=models.ManyToManyField(tblWeekDay)
    Day_time = models.DurationField()


class tblNotifications(models.Model):
    sound_alert = (
        ('alarm1.mp3', 'alarm1.mp3'),
        ('alarm2.mp3', 'alarm2.mp3'),
        ('alarm3.mp3', 'alarm3.mp3'),
        ('alarm4.mp3', 'alarm4.mp3'),
    )
    email_template = (('Default', 'Default'),)
    sms_template = (('Default', 'Default'),)
    object_arrow_color = (
        ('Yellow', 'Yellow'),
        ('Black', 'Black'),
        ('Blue', 'Blue'),
        ('Green', 'Green'),
        ('Purple', 'Purple'),
    )

    System_message = models.BooleanField()
    Auto_hide = models.BooleanField()
    Push_Notification = models.BooleanField()
    Sound_alert = models.BooleanField(max_length=100, choices=sound_alert)
    Message_to_email = models.EmailField(max_length=200, unique=True)
    SMS_to_mobile = models.IntegerField()
    E_mail_template = models.CharField(max_length=100, choices=email_template)
    SMS_template = models.CharField(max_length=100, choices=sms_template)
    Object_arrow_color = models.CharField(max_length=100, choices=object_arrow_color)
    Object_list_color = models.CharField(max_length=10)


class tblTemplate(models.Model):
    Name = models.CharField(max_length=100)
    Description = models.TextField()
    Subject = models.CharField(max_length=100)
    Message = models.TextField()


class tblAccount(models.Model):
    language = (
        ('English', 'English'),
        ('German', 'German'),
        ('French', 'French'),
        ('Italian', 'Italian'),
        ('Thai', 'Thai'),
    )

    unit_of_distance = (
        ('Kilometer', 'Kilometer'),
        ('Mile', 'Mile'),
        ('Nautical mile', 'Nautical mile'),
    )

    unit_of_capacity = (
        ('Liter', 'Liter'),
        ('Gallon', 'Gallon'),
    )

    unit_of_temperature = (
        ('Celsius', 'Celsius'),
        ('Fahrenheit', 'Fahrenheit')
    )

    currency = (
        ('EUR', 'EUR'),
    )

    time_zone = (
        ('UTC -12:00', 'UTC -12:00'),
        ('UTC -11:00', 'UTC -11:00'),
        ('UTC -4:30', 'UTC -4:30'),
        ('UTC +5:00', 'UTC +5:00'),
        ('UTC +7:00', 'UTC +7:00'),
        ('UTC +14:00', 'UTC +14:00'),

    )

    Name_Surname = models.CharField(max_length=100)
    Company = models.CharField(max_length=100)
    #Address = models.ForeignKey(tbladdress, on_delete=models.CASCADE)
    Post_code = models.CharField(max_length=30)
    City = models.CharField(max_length=40)
    Country_State = models.CharField(max_length=100)
    Phone_number_1 = models.BigIntegerField()
    Phone_number_2 = models.BigIntegerField()
    Email = models.EmailField(unique=True)
    Old_password = models.CharField(max_length=100)
    New_password = models.CharField(max_length=100)
    Repeat_new_password = models.CharField(max_length=100)
    Language = models.CharField(max_length=100, choices=language)
    Unit_of_distance = models.CharField(max_length=100, choices=unit_of_distance)
    Unit_of_capacity = models.CharField(max_length=100, choices=unit_of_capacity)
    Unit_of_temperature = models.CharField(max_length=100, choices=unit_of_temperature)
    Currency = models.CharField(max_length=100, choices=currency)
    Time_zone = models.CharField(max_length=100, choices=time_zone)


class tblSubaccount(models.Model):
    markers = (
        ()
    )
    Active = models.BooleanField()
    Username = models.CharField(max_length=100)
    Email = models.EmailField(unique=True)
    Password = models.CharField(max_length=100)
    Send_credentials = models.BooleanField()
    #Objects = models.ForeignKey(tblvehicletype, on_delete=models.CASCADE)
    Markers = models.CharField(max_length=100, choices=markers)
    Dashboard = models.BooleanField()
    History = models.BooleanField()
    Reports = models.BooleanField()
    Tasks = models.BooleanField()
    RFID_ibutton = models.BooleanField()
    DTC = models.BooleanField()
    Maintenance = models.BooleanField()
    Expenses = models.BooleanField()
    Object_control = models.BooleanField()
    Image_gallery = models.BooleanField()
    Chat = models.BooleanField()

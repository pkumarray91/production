# Generated by Django 3.1.7 on 2021-02-27 06:46

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='csvs')),
                ('upload_timestamp', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'Audit',
            },
        ),
        migrations.CreateModel(
            name='AVLID_TABLE',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_id_in_avl_packet', models.CharField(max_length=4000)),
                ('property_name', models.CharField(max_length=4000)),
                ('bytes', models.CharField(max_length=4000)),
                ('type', models.CharField(max_length=4000)),
                ('value_range_min', models.CharField(max_length=4000)),
                ('value_range_max', models.CharField(max_length=4000)),
                ('multiplier', models.CharField(max_length=4000)),
                ('units', models.CharField(max_length=4000)),
                ('data', models.CharField(max_length=4000)),
                ('description', models.CharField(max_length=4000)),
                ('parameter_group', models.CharField(max_length=4000)),
            ],
            options={
                'db_table': 'AVLID_TABLE',
            },
        ),
        migrations.CreateModel(
            name='AvlTable',
            fields=[
                ('avl_id', models.AutoField(primary_key=True, serialize=False)),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('IMEI', models.BigIntegerField(blank=True, null=True)),
                ('timestamp_size', models.BigIntegerField()),
                ('timestamp_value', models.DateTimeField(auto_now_add=True)),
                ('timestamp_hex', models.CharField(max_length=255)),
                ('priority_size', models.BigIntegerField()),
                ('priority_value', models.BigIntegerField()),
                ('priority_hex', models.CharField(max_length=255)),
                ('no_of_gpselement', models.BigIntegerField()),
                ('longitude_size', models.BigIntegerField()),
                ('longitude_value', models.BigIntegerField()),
                ('longitude_hex', models.CharField(max_length=255)),
                ('latitude_size', models.BigIntegerField()),
                ('latitude_value', models.BigIntegerField()),
                ('latitude_hex', models.CharField(max_length=255)),
                ('altitude_size', models.BigIntegerField()),
                ('altitude_value', models.BigIntegerField()),
                ('altitude_hex', models.CharField(max_length=255)),
                ('angle_size', models.BigIntegerField()),
                ('angle_value', models.BigIntegerField()),
                ('angle_hex', models.CharField(max_length=255)),
                ('satellite_size', models.BigIntegerField()),
                ('satellite_value', models.BigIntegerField()),
                ('satellite_hex', models.CharField(max_length=255)),
                ('speed_size', models.BigIntegerField()),
                ('speed_value', models.BigIntegerField()),
                ('speed_hex', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'AvlTable',
            },
        ),
        migrations.CreateModel(
            name='IO_Element',
            fields=[
                ('IO_number', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('IMEI', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('oneb_element_count', models.BigIntegerField()),
                ('twob_element_count', models.BigIntegerField()),
                ('fourb_element_count', models.BigIntegerField()),
                ('Eightb_element_count', models.BigIntegerField()),
                ('xb_element_count', models.BigIntegerField(blank=True, null=True)),
                ('avl_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.avltable')),
            ],
            options={
                'db_table': 'IO_Element',
            },
        ),
        migrations.CreateModel(
            name='tbladdress',
            fields=[
                ('address_id', models.IntegerField(primary_key=True, serialize=False)),
                ('address1', models.TextField(blank=True, null=True)),
                ('address2', models.TextField(blank=True, null=True)),
                ('city', models.CharField(max_length=40)),
                ('state', models.CharField(max_length=40)),
                ('zip_code', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='tblallocatedeallocate',
            fields=[
                ('allocate_deallocate_id', models.AutoField(primary_key=True, serialize=False)),
                ('allocate_on', models.DateTimeField(auto_now=True)),
                ('deallocate_on', models.DateTimeField(blank=True, null=True)),
                ('add_notes', models.TextField(blank=True, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'ALLOCATION_DEALLOCATION_TABLE',
            },
        ),
        migrations.CreateModel(
            name='tblcompany',
            fields=[
                ('company_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('contact_number', models.CharField(blank=True, max_length=15, null=True)),
                ('currency', models.CharField(max_length=100)),
                ('language', models.CharField(max_length=100)),
                ('region', models.CharField(max_length=100)),
                ('is_deleted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbladdress')),
            ],
            options={
                'db_table': 'Tblcompany',
            },
        ),
        migrations.CreateModel(
            name='tblcountries',
            fields=[
                ('country_code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('continent_name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='tbldevice',
            fields=[
                ('device_id', models.AutoField(primary_key=True, serialize=False)),
                ('device_name', models.CharField(max_length=255)),
                ('GSM_number', models.CharField(blank=True, max_length=200, null=True)),
                ('ICCID_number', models.CharField(blank=True, max_length=200, null=True)),
                ('IMEI_number', models.BigIntegerField()),
                ('device_type', models.CharField(choices=[('tracking device', 'tracking device'), ('fuel sensor', 'fuel sensor'), ('temperature sensor', 'temperature sensor')], default='tracking device', max_length=255)),
                ('available', models.CharField(default='Yes', max_length=10)),
                ('comments', models.CharField(blank=True, max_length=255, null=True)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'DEVICE_TBL',
            },
        ),
        migrations.CreateModel(
            name='TblFuelMgmt',
            fields=[
                ('fuel_mgmt_id', models.AutoField(primary_key=True, serialize=False)),
                ('tank_capacity', models.IntegerField()),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('comments', models.CharField(blank=True, max_length=255, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('allocateddeallocate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblallocatedeallocate')),
                ('sensor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbldevice')),
            ],
            options={
                'db_table': 'fuel_mgmt',
            },
        ),
        migrations.CreateModel(
            name='TblRawMessage',
            fields=[
                ('raw_id', models.AutoField(primary_key=True, serialize=False)),
                ('socket_receive_time', models.DateTimeField(auto_now_add=True)),
                ('thread_send_time', models.DateTimeField(auto_now_add=True)),
                ('kafka_read_time', models.DateTimeField(auto_now_add=True)),
                ('kafka_publish_time', models.DateTimeField(auto_now_add=True)),
                ('IMEI', models.CharField(max_length=255)),
                ('IMEI_Num', models.BigIntegerField()),
                ('raw_data_hexa', models.CharField(max_length=8192)),
            ],
            options={
                'db_table': 'TblRawMessage',
            },
        ),
        migrations.CreateModel(
            name='tblurl',
            fields=[
                ('url', models.URLField(max_length=100, primary_key=True, serialize=False)),
                ('serverIP', models.CharField(blank=True, max_length=100, null=True)),
                ('api_key', models.CharField(blank=True, max_length=50, null=True)),
                ('help_url', models.URLField(blank=True, max_length=100, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'tblurl',
            },
        ),
        migrations.CreateModel(
            name='XB_Element',
            fields=[
                ('XB_id', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('avl_id', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('Id_size', models.BigIntegerField()),
                ('Id_value', models.BigIntegerField()),
                ('Id_hexvalue', models.CharField(max_length=255)),
                ('value_size', models.BigIntegerField()),
                ('value_dec', models.BigIntegerField()),
                ('value_hexvalue', models.CharField(max_length=255)),
                ('value_after_multiplication', models.FloatField()),
                ('Io_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.io_element')),
            ],
            options={
                'db_table': 'XB_Element',
            },
        ),
        migrations.CreateModel(
            name='TwoB_Element',
            fields=[
                ('TwoB_id', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('avl_id', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('Id_size', models.BigIntegerField()),
                ('Id_value', models.BigIntegerField()),
                ('Id_hexvalue', models.CharField(max_length=255)),
                ('value_size', models.BigIntegerField()),
                ('value_dec', models.BigIntegerField()),
                ('value_hexvalue', models.CharField(max_length=255)),
                ('value_after_multiplication', models.FloatField()),
                ('Io_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.io_element')),
            ],
            options={
                'db_table': 'TwoB_Element',
            },
        ),
        migrations.CreateModel(
            name='tblvehicle',
            fields=[
                ('vehicle_id', models.AutoField(primary_key=True, serialize=False)),
                ('vehicle_number', models.CharField(max_length=100)),
                ('vehicle_icons', models.CharField(blank=True, max_length=200, null=True)),
                ('vehicle_marker', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now=True, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('company', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblcompany')),
            ],
            options={
                'db_table': 'VEHICLE_TBL',
            },
        ),
        migrations.CreateModel(
            name='tblreseller',
            fields=[
                ('reseller_id', models.AutoField(primary_key=True, serialize=False)),
                ('reseller_name', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('reseller_image', models.ImageField(upload_to='')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('contact_number', models.CharField(blank=True, max_length=20, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbladdress')),
                ('reseller_url', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblurl')),
            ],
            options={
                'db_table': 'tblreseller',
            },
        ),
        migrations.CreateModel(
            name='tblLocationTracking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Receive_Time', models.DateTimeField(auto_now_add=True)),
                ('Longitude', models.IntegerField()),
                ('Latitude', models.IntegerField()),
                ('Altitude', models.IntegerField()),
                ('Angle', models.IntegerField()),
                ('Satellites', models.IntegerField()),
                ('Speed', models.CharField(max_length=200)),
                ('Formatted_address', models.CharField(max_length=200)),
                ('Geometery_latitude', models.FloatField()),
                ('Geometery_longitude', models.FloatField()),
                ('Location_type', models.CharField(blank=True, max_length=200, null=True)),
                ('Place_Id', models.CharField(blank=True, max_length=200, null=True)),
                ('Vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locationtracking', to='sapaslogin.tblvehicle')),
            ],
        ),
        migrations.CreateModel(
            name='tblgroup',
            fields=[
                ('group_id', models.AutoField(primary_key=True, serialize=False)),
                ('group_name', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.IntegerField(blank=True, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblcompany')),
            ],
            options={
                'db_table': 'tblgroup',
            },
        ),
        migrations.CreateModel(
            name='TblFuelStatus',
            fields=[
                ('fuel_status_id', models.AutoField(primary_key=True, serialize=False)),
                ('fuel_level', models.IntegerField()),
                ('volts', models.FloatField()),
                ('avl_time', models.DateTimeField(auto_now_add=True)),
                ('insert_time', models.DateTimeField(auto_now_add=True)),
                ('comments', models.CharField(blank=True, max_length=200, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('fuel_mgmt_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblfuelmgmt')),
            ],
            options={
                'db_table': 'FUEL_STATUS',
            },
        ),
        migrations.CreateModel(
            name='tbldriver',
            fields=[
                ('created_at', models.DateTimeField(auto_created=True)),
                ('driver_id', models.IntegerField(primary_key=True, serialize=False)),
                ('driver_name', models.CharField(max_length=100)),
                ('RFID_ibutton', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('driver_id_number', models.CharField(max_length=100)),
                ('phone', models.BigIntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('descr', models.TextField(max_length=200)),
                ('status', models.IntegerField()),
                ('hire_date', models.DateField()),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbladdress')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblcompany')),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblgroup')),
            ],
        ),
        migrations.AddField(
            model_name='tbldevice',
            name='reseller',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblreseller'),
        ),
        migrations.AddField(
            model_name='tblcompany',
            name='reseller',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblreseller'),
        ),
        migrations.AddField(
            model_name='tblallocatedeallocate',
            name='device',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbldevice'),
        ),
        migrations.AddField(
            model_name='tblallocatedeallocate',
            name='vehicle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblvehicle'),
        ),
        migrations.AddField(
            model_name='tbladdress',
            name='country_code',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblcountries'),
        ),
        migrations.CreateModel(
            name='OneB_Element',
            fields=[
                ('OneB_id', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('avl_id', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('Id_size', models.BigIntegerField()),
                ('Id_value', models.BigIntegerField()),
                ('Id_hexvalue', models.CharField(max_length=255)),
                ('value_size', models.BigIntegerField()),
                ('value_dec', models.BigIntegerField()),
                ('value_hexvalue', models.CharField(max_length=255)),
                ('value_after_multiplication', models.FloatField()),
                ('Io_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.io_element')),
            ],
            options={
                'db_table': 'OneB_Element',
            },
        ),
        migrations.CreateModel(
            name='MainTable',
            fields=[
                ('maintableid', models.AutoField(primary_key=True, serialize=False)),
                ('IMEI', models.CharField(max_length=255)),
                ('preamble_size', models.BigIntegerField()),
                ('preamble_value', models.BigIntegerField()),
                ('preamble_hexvalue', models.CharField(max_length=255)),
                ('avl_data_length_size', models.BigIntegerField()),
                ('avl_data_length_value', models.BigIntegerField()),
                ('avl_data_length_hexvalue', models.CharField(max_length=255)),
                ('crc_size', models.BigIntegerField()),
                ('crc_value', models.BigIntegerField()),
                ('crc_hexvalue', models.CharField(max_length=255)),
                ('raw_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblrawmessage')),
            ],
            options={
                'db_table': 'MainTable',
            },
        ),
        migrations.CreateModel(
            name='FuelCalibrationData',
            fields=[
                ('fuel_calibration_data_id', models.AutoField(primary_key=True, serialize=False)),
                ('from_volt', models.FloatField()),
                ('to_volt', models.FloatField()),
                ('from_fuel', models.IntegerField()),
                ('to_fuel', models.IntegerField()),
                ('fuel_mgmt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblfuelmgmt')),
            ],
            options={
                'db_table': 'FUEL_CALIBRATION_DATA',
            },
        ),
        migrations.CreateModel(
            name='FourB_Element',
            fields=[
                ('FourB_id', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('avl_id', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('Id_size', models.BigIntegerField()),
                ('Id_value', models.BigIntegerField()),
                ('Id_hexvalue', models.CharField(max_length=255)),
                ('value_size', models.BigIntegerField()),
                ('value_dec', models.BigIntegerField()),
                ('value_hexvalue', models.CharField(max_length=255)),
                ('value_after_multiplication', models.FloatField()),
                ('Io_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.io_element')),
            ],
            options={
                'db_table': 'FourB_Element',
            },
        ),
        migrations.CreateModel(
            name='EightB_Element',
            fields=[
                ('EightB_id', models.AutoField(primary_key=True, serialize=False)),
                ('data_id', models.BigIntegerField()),
                ('maintableid', models.BigIntegerField()),
                ('raw_id', models.BigIntegerField()),
                ('avl_id', models.BigIntegerField()),
                ('event_id_size', models.BigIntegerField()),
                ('event_id_value', models.BigIntegerField()),
                ('event_id_hexvalue', models.CharField(max_length=255)),
                ('element_count_size', models.BigIntegerField()),
                ('element_count_value', models.BigIntegerField()),
                ('element_count_hexvalue', models.CharField(max_length=255)),
                ('origin_type_hexvalue', models.CharField(blank=True, max_length=255, null=True)),
                ('origin_type_size', models.BigIntegerField(blank=True, null=True)),
                ('origin_value', models.BigIntegerField(blank=True, null=True)),
                ('Id_size', models.BigIntegerField()),
                ('Id_value', models.BigIntegerField()),
                ('Id_hexvalue', models.CharField(max_length=255)),
                ('value_size', models.BigIntegerField()),
                ('value_dec', models.BigIntegerField()),
                ('value_hexvalue', models.CharField(max_length=255)),
                ('value_after_multiplication', models.FloatField()),
                ('Io_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.io_element')),
            ],
            options={
                'db_table': 'EightB_Element',
            },
        ),
        migrations.CreateModel(
            name='DataTable',
            fields=[
                ('data_id', models.AutoField(primary_key=True, serialize=False)),
                ('raw_id', models.BigIntegerField()),
                ('IMEI', models.BigIntegerField()),
                ('codec_id_size', models.BigIntegerField()),
                ('codec_id_value', models.BigIntegerField()),
                ('codec_id_hexvalue', models.CharField(max_length=20)),
                ('start_avl_data_count_size', models.BigIntegerField()),
                ('start_avl_data_count_value', models.BigIntegerField()),
                ('start_avl_data_count_hexvalue', models.CharField(max_length=20)),
                ('avl_data', models.CharField(max_length=8192)),
                ('end_avl_data_count_size', models.BigIntegerField()),
                ('end_avl_data_count_value', models.BigIntegerField()),
                ('end_avl_data_count_hexvalue', models.CharField(max_length=20)),
                ('maintableid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.maintable')),
            ],
            options={
                'db_table': 'DataTable',
            },
        ),
        migrations.AddField(
            model_name='avltable',
            name='data_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.datatable'),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(blank=True, max_length=255, verbose_name='First Name')),
                ('last_name', models.CharField(blank=True, max_length=255, verbose_name='Last Name')),
                ('category_type', models.CharField(choices=[('1', 'admin'), ('2', 'sales'), ('3', 'marketing')], default='0', max_length=20)),
                ('user_type', models.CharField(choices=[('1', 'Reseller'), ('2', 'company'), ('3', 'group'), ('4', 'driver')], default='0', max_length=20)),
                ('contact_number', models.CharField(blank=True, max_length=15, null=True)),
                ('reseller_type', models.CharField(choices=[('CT', 'CT'), ('MT', 'MT'), ('PT', 'PT')], default='0', max_length=200)),
                ('is_deleted', models.BooleanField(default=False)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblcompany')),
                ('driver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tbldriver')),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblgroup')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('reseller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblreseller')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
                ('user_url', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sapaslogin.tblurl')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
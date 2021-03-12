# Generated by Django 3.0.8 on 2021-01-08 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='tblAccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name_Surname', models.CharField(max_length=100)),
                ('Company', models.CharField(max_length=100)),
                ('Post_code', models.CharField(max_length=30)),
                ('City', models.CharField(max_length=40)),
                ('Country_State', models.CharField(max_length=100)),
                ('Phone_number_1', models.BigIntegerField()),
                ('Phone_number_2', models.BigIntegerField()),
                ('Email', models.EmailField(max_length=254, unique=True)),
                ('Old_password', models.CharField(max_length=100)),
                ('New_password', models.CharField(max_length=100)),
                ('Repeat_new_password', models.CharField(max_length=100)),
                ('Language', models.CharField(choices=[('English', 'English'), ('German', 'German'), ('French', 'French'), ('Italian', 'Italian'), ('Thai', 'Thai')], max_length=100)),
                ('Unit_of_distance', models.CharField(choices=[('Kilometer', 'Kilometer'), ('Mile', 'Mile'), ('Nautical mile', 'Nautical mile')], max_length=100)),
                ('Unit_of_capacity', models.CharField(choices=[('Liter', 'Liter'), ('Gallon', 'Gallon')], max_length=100)),
                ('Unit_of_temperature', models.CharField(choices=[('Celsius', 'Celsius'), ('Fahrenheit', 'Fahrenheit')], max_length=100)),
                ('Currency', models.CharField(choices=[('EUR', 'EUR')], max_length=100)),
                ('Time_zone', models.CharField(choices=[('UTC -12:00', 'UTC -12:00'), ('UTC -11:00', 'UTC -11:00'), ('UTC -4:30', 'UTC -4:30'), ('UTC +5:00', 'UTC +5:00'), ('UTC +7:00', 'UTC +7:00'), ('UTC +14:00', 'UTC +14:00')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='tblMain',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Active', models.BooleanField()),
                ('Name', models.CharField(max_length=100)),
                ('Type', models.CharField(choices=[('overspeed', 'overspeed'), ('moving', 'moving'), ('underspeed', 'underspeed'), ('stopped', 'stopped'), ('route_in', 'route_in'), ('route_out', 'route_out'), ('zone_in', 'zone_in'), ('harsh braking', 'harsh braking'), ('driver change', 'drive change')], max_length=100)),
                ('Depending_on_routes', models.CharField(choices=[('off', 'off'), ('In selected routes', 'In selected routes'), ('Out of selected routes', 'Out of selected routes')], max_length=100)),
                ('Depending_on_zones', models.CharField(choices=[('off', 'off'), ('In selected zones', 'In selected zones'), ('Out of selected zones', 'Out of selected zones')], max_length=100)),
                ('Zones', models.CharField(choices=[('Bialystok', 'Bialystok'), ('Coventry', 'Coventry'), ('Goole', 'Goole'), ('Heywood', 'Heywood'), ('Ostrow', 'Ostrow'), ('Preston', 'Preston'), ('Veino', 'Veino'), ('Warsaw', 'Warsaw')], max_length=100)),
                ('Time_period', models.TimeField()),
                ('speed_limit', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='tblNotifications',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('System_message', models.BooleanField()),
                ('Auto_hide', models.BooleanField()),
                ('Push_Notification', models.BooleanField()),
                ('Sound_alert', models.BooleanField(choices=[('alarm1.mp3', 'alarm1.mp3'), ('alarm2.mp3', 'alarm2.mp3'), ('alarm3.mp3', 'alarm3.mp3'), ('alarm4.mp3', 'alarm4.mp3')], max_length=100)),
                ('Message_to_email', models.EmailField(max_length=200, unique=True)),
                ('SMS_to_mobile', models.IntegerField()),
                ('E_mail_template', models.CharField(choices=[('Default', 'Default')], max_length=100)),
                ('SMS_template', models.CharField(choices=[('Default', 'Default')], max_length=100)),
                ('Object_arrow_color', models.CharField(choices=[('Yellow', 'Yellow'), ('Black', 'Black'), ('Blue', 'Blue'), ('Green', 'Green'), ('Purple', 'Purple')], max_length=100)),
                ('Object_list_color', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='tblSubaccount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Active', models.BooleanField()),
                ('Username', models.CharField(max_length=100)),
                ('Email', models.EmailField(max_length=254, unique=True)),
                ('Password', models.CharField(max_length=100)),
                ('Send_credentials', models.BooleanField()),
                ('Markers', models.CharField(choices=[], max_length=100)),
                ('Dashboard', models.BooleanField()),
                ('History', models.BooleanField()),
                ('Reports', models.BooleanField()),
                ('Tasks', models.BooleanField()),
                ('RFID_ibutton', models.BooleanField()),
                ('DTC', models.BooleanField()),
                ('Maintenance', models.BooleanField()),
                ('Expenses', models.BooleanField()),
                ('Object_control', models.BooleanField()),
                ('Image_gallery', models.BooleanField()),
                ('Chat', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='tblTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=100)),
                ('Description', models.TextField()),
                ('Subject', models.CharField(max_length=100)),
                ('Message', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='tblWeekDay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weekday', models.CharField(choices=[('MON', 'Monday'), ('TUE', 'Tuesday'), ('WED', 'Wednesday'), ('THU', 'Thursday'), ('FRI', 'Friday'), ('SAT', 'Saturday'), ('SUN', 'Sunday')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='tblTime',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Duration_form_last_event_in_minutes', models.IntegerField()),
                ('Day_time', models.DurationField()),
                ('tblweekday', models.ManyToManyField(to='events.tblWeekDay')),
            ],
        ),
    ]

# Generated by Django 3.0.8 on 2021-01-08 06:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TourCreation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tour_name', models.CharField(blank=True, max_length=200, null=True)),
                ('start_point', models.CharField(blank=True, max_length=200, null=True)),
                ('end_point', models.CharField(blank=True, max_length=200, null=True)),
                ('stops', models.CharField(blank=True, max_length=200, null=True)),
                ('distance', models.CharField(blank=True, max_length=200, null=True)),
                ('duration', models.CharField(blank=True, max_length=200, null=True)),
                ('total_time', models.CharField(blank=True, max_length=200, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('create_date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TourAllocate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tour_allocate_name', models.CharField(blank=True, max_length=200, null=True)),
                ('Vehicle_data', models.CharField(blank=True, max_length=200, null=True)),
                ('Date_allocate', models.CharField(blank=True, max_length=200, null=True)),
                ('Time_allocate', models.CharField(blank=True, max_length=200, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('Tour_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tour.TourCreation')),
            ],
        ),
        migrations.CreateModel(
            name='StartPoint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('start_address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='start_lat_lng', to='tour.TourCreation')),
            ],
        ),
        migrations.CreateModel(
            name='EndPoint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lat', models.FloatField()),
                ('lng', models.FloatField()),
                ('end_address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='end_lat_lng', to='tour.TourCreation')),
            ],
        ),
    ]
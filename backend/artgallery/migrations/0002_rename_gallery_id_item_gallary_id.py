# Generated by Django 5.1.2 on 2024-11-15 21:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artgallery', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='gallery_id',
            new_name='gallary_id',
        ),
    ]

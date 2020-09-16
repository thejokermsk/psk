# Generated by Django 3.1.1 on 2020-09-11 18:49

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0005_contact_headerslider_verify'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
        migrations.AlterField(
            model_name='verify',
            name='img_path',
            field=models.ImageField(upload_to='images/', verbose_name='Сертификаты'),
        ),
    ]

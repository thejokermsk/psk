# Generated by Django 3.1.1 on 2020-09-11 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categories',
            options={'verbose_name': 'направления деятельности', 'verbose_name_plural': 'Направления деятельности'},
        ),
        migrations.AlterField(
            model_name='categories',
            name='description',
            field=models.TextField(verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='categories',
            name='img_path',
            field=models.ImageField(upload_to='images/', verbose_name='Изображение'),
        ),
        migrations.AlterField(
            model_name='categories',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Название'),
        ),
    ]
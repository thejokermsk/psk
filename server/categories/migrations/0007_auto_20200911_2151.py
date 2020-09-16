# Generated by Django 3.1.1 on 2020-09-11 18:51

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0006_auto_20200911_2149'),
    ]

    operations = [
        migrations.CreateModel(
            name='Build',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'о компании',
                'verbose_name_plural': 'о компании',
            },
        ),
        migrations.AlterField(
            model_name='categories',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(verbose_name='Описание'),
        ),
    ]

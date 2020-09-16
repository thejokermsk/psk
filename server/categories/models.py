from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class Categories(models.Model):
  name  = models.CharField(max_length=255, verbose_name='Название')
  img_path = models.ImageField(upload_to='images/', verbose_name='Изображение')
  description = RichTextUploadingField(verbose_name='Описание')
  
  def __str__(self):
    return self.name

  class Meta:
    verbose_name = "направления деятельности"
    verbose_name_plural = "Направления деятельности"



class Products(models.Model):
  category = models.ForeignKey(Categories, related_name='products', on_delete=models.CASCADE, verbose_name='Направления деятельности')
  name = models.CharField(max_length=255, verbose_name='Название')
  img_path = models.ImageField(upload_to='images/', verbose_name='Изображение')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = "позицию"
    verbose_name_plural = "позиции"


class HeaderSlider(models.Model):
  img_path = models.ImageField(upload_to='images/', verbose_name='Изображение')

  class Meta:
    verbose_name = "изображения"
    verbose_name_plural = "изображения"


class Contact(models.Model):
  address = models.CharField(max_length=255, verbose_name='Адрес')
  phone   = models.CharField(max_length=50, verbose_name='Телефон')
  email   = models.EmailField(verbose_name='Email')

  def __str__(self):
    return self.address

  class Meta:
    verbose_name = "контакт"
    verbose_name_plural = "контакты"


class Verify(models.Model):
  img_path = models.ImageField(upload_to='images/', verbose_name='Сертификаты')

  class Meta:
    verbose_name = "сертификат"
    verbose_name_plural = "сертификаты"


class Build(models.Model):
  description = RichTextUploadingField(verbose_name='Описание')

  class Meta:
    verbose_name = "о компании"
    verbose_name_plural = "о компании"
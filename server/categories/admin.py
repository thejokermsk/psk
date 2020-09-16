from django.contrib import admin

# Register your models here.
from .models import *

class ProductsInline(admin.TabularInline):
  model = Products

# Register your models here.
@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
  list_display = ('name', 'description')
  inlines = (ProductsInline, )


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
  list_display = ('address', 'phone', 'email')


@admin.register(HeaderSlider)
class HeaderSliderAdmin(admin.ModelAdmin):
  list_display = ('img_path', )


@admin.register(Verify)
class VerifyAdmin(admin.ModelAdmin):
  list_display = ('img_path', )


@admin.register(Build)
class BuildAdmin(admin.ModelAdmin):
  list_display = ('description', )
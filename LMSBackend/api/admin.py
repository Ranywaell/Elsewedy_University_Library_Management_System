from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from api.models import Member
# Register your models here.

admin.site.register(Member)

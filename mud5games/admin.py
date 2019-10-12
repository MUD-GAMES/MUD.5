from django.contrib import admin

class UserAdmin(admin.ModelAdmin):
    list_display = ['User_Name', 'Email', 'First_Name', 'Last_Name',]

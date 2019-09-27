# Generated by Django 2.2.1 on 2019-09-26 02:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mud5games', '0003_auto_20190925_0845'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='the_user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('stud_db', '0003_remove_student_highlighted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='last_name',
        ),
        migrations.AddField(
            model_name='student',
            name='patronymic',
            field=models.CharField(default=datetime.date(2015, 1, 21), max_length=100),
            preserve_default=False,
        ),
    ]

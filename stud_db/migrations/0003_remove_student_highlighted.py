# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stud_db', '0002_auto_20150113_1217'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='highlighted',
        ),
    ]

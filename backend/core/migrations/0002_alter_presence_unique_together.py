# Generated by Django 5.2 on 2025-05-02 14:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='presence',
            unique_together={('eleve', 'matiere', 'date', 'sceance')},
        ),
    ]

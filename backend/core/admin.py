from django.contrib import admin
from .models import Etude, Groupe, Eleve, Presence, AlerteAbsence, RapportAbsence, Notification ,Matiere , User

admin.site.register(Etude)
admin.site.register(Groupe)

admin.site.register(Eleve)
admin.site.register(Presence)
admin.site.register(AlerteAbsence)
admin.site.register(RapportAbsence)
admin.site.register(Notification)
admin.site.register(Matiere)
admin.site.register(User)


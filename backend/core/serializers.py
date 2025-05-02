from rest_framework import serializers
from .models import Eleve, Etude, Groupe, Presence, AlerteAbsence, Notification, RapportPDF

class EtudeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etude
        fields = ['id', 'filiere']

class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe
        fields = ['id', 'groupeName', 'filiere']

class EleveSerializer(serializers.ModelSerializer):
    # on écrit via les PK et on lit aussi les infos
    filiere = serializers.PrimaryKeyRelatedField(queryset=Etude.objects.all())
    groupe  = serializers.PrimaryKeyRelatedField(queryset=Groupe.objects.all())

    class Meta:
        model  = Eleve
        fields = ['id', 'nom', 'prenom', 'email_parent', 'filiere', 'groupe']

class PresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Presence
        fields = ['id', 'eleve', 'matiere', 'date', 'present']

class AlerteAbsenceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AlerteAbsence
        fields = ['id', 'eleve', 'date', 'nbr_absences']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Notification
        fields = ['id', 'eleve', 'date', 'message', 'date_envoi']

class RapportPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model  = RapportPDF
        fields = ['id', 'eleve', 'date', 'message', 'date_envoi']

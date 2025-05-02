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
    # Lit la colonne "filiere" et "groupe" de l'objet lié Etude et Groupe
    filiere_name = serializers.CharField(source='filiere.filiere', read_only=True)
    groupe_name  = serializers.CharField(source='groupe.groupeName', read_only=True)

    class Meta:
        model  = Eleve
        fields = [
            'id', 'nom', 'prenom', 'email_parent',
            'filiere', 'groupe',
            'filiere_name', 'groupe_name'
        ]
        
class PresenceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Presence
        fields = ['eleve', 'matiere', 'date', 'present', 'sceance']

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

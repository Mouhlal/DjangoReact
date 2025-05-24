from rest_framework import serializers
from .models import Eleve, Etude, Groupe, Presence, AlerteAbsence, Notification, RapportPDF , Matiere 
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_admin', 'is_eleve')
class EtudeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etude
        fields = ['id', 'filiere']

class GroupeSerializer(serializers.ModelSerializer):
    filiere_name = serializers.CharField(source='filiere.filiere', read_only=True)
    class Meta:
        model = Groupe
        fields = ['id', 'groupeName', 'filiere', 'filiere_name']

class EleveSerializer(serializers.ModelSerializer):
    filiere_name = serializers.CharField(source='filiere.filiere', read_only=True)
    groupe_name  = serializers.CharField(source='groupe.groupeName', read_only=True)

    class Meta:
        model = Eleve
        fields = ['id', 'nom', 'prenom', 'email_parent', 'filiere', 'groupe', 'filiere_name', 'groupe_name', 'image']

class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = ['id', 'nom','filiere',]
        depth = 1  

class PresenceSerializer(serializers.ModelSerializer):
    eleve = EleveSerializer(read_only=True)
    eleve_id = serializers.PrimaryKeyRelatedField(
        queryset=Eleve.objects.all(),
        source='eleve',
        write_only=True
    )

    matiere = MatiereSerializer(read_only=True)
    matiere_id = serializers.PrimaryKeyRelatedField(
        queryset=Matiere.objects.all(),
        source='matiere',
        write_only=True
    )

    class Meta:
        model = Presence
        fields = [
            'id',
            'eleve',    'eleve_id',
            'matiere',  'matiere_id',
            'date',
            'sceance',
            'present',
        ]

class AlerteAbsenceSerializer(serializers.ModelSerializer):
    eleve_nom = serializers.CharField(source='eleve.nom', read_only=True)
    eleve_prenom = serializers.CharField(source='eleve.prenom', read_only=True)
    class Meta:
        model  = AlerteAbsence
        fields = ['id', 'eleve', 'date', 'nbr_absences', 'eleve_nom', 'eleve_prenom']

class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model  = Notification
        fields = ['id', 'eleve', 'date', 'message', 'date_envoi']

class RapportPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model  = RapportPDF
        fields = ['id', 'eleve', 'fichier_pdf','date_creation']


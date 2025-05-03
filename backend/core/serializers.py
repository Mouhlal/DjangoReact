from rest_framework import serializers
from .models import Eleve, Etude, Groupe, Presence, AlerteAbsence, Notification, RapportPDF , Matiere

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
class MatiereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = ['id', 'nom','filiere',]
        depth = 1  # <— permet de renvoyer matiere comme objet complet

class PresenceSerializer(serializers.ModelSerializer):
    # Objet élève complet (lecture seule)
    eleve = EleveSerializer(read_only=True)
    # Pour l’écriture, on accepte eleve_id
    eleve_id = serializers.PrimaryKeyRelatedField(
        queryset=Eleve.objects.all(),
        source='eleve',
        write_only=True
    )

    # Objet matière complet (lecture seule)
    matiere = MatiereSerializer(read_only=True)
    # Pour l’écriture, on accepte matiere_id
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


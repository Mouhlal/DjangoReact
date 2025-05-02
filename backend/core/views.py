from rest_framework import viewsets
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework import status

from .models import Eleve, Etude, Groupe, Presence, AlerteAbsence, Notification, RapportPDF
from .serializers import (
    EleveSerializer, EtudeSerializer, GroupeSerializer,
    PresenceSerializer, AlerteAbsenceSerializer,
    NotificationSerializer, RapportPDFSerializer
)

class EtudeViewSet(viewsets.ModelViewSet):
    queryset = Etude.objects.all()
    serializer_class = EtudeSerializer

class GroupeViewSet(viewsets.ModelViewSet):
    queryset = Groupe.objects.all()
    serializer_class = GroupeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        filiere_id = self.request.query_params.get('filiere_id')
        if filiere_id:
            queryset = queryset.filter(filiere_id=filiere_id)
        return queryset
    
class EleveViewSet(viewsets.ModelViewSet):
    queryset = Eleve.objects.all()
    serializer_class = EleveSerializer

class PresenceViewSet(viewsets.ModelViewSet):
    queryset = Presence.objects.all()
    serializer_class = PresenceSerializer

    def perform_create(self, serializer):
        presence = serializer.save()

        # Vérifie si l'élève était absent
        if not presence.present:
            start_date = timezone.now().date() - timedelta(days=7)
            absences_count = Presence.objects.filter(
                eleve=presence.eleve,
                present=False,
                date__gte=start_date
            ).count()

            if absences_count >= 3:
                try:
                    # Créer une alerte
                    alerte = AlerteAbsence.objects.create(
                        eleve=presence.eleve,
                        date=presence.date,
                        nbr_absences=absences_count
                    )

                    # Créer une notification pour le parent
                    Notification.objects.create(
                        eleve=presence.eleve,
                        message=f"Votre enfant {presence.eleve.prenom} a été absent {absences_count} fois cette semaine.",
                        date=timezone.now()  # Ajouter la date actuelle
                    )

                except Exception as e:
                    # Si une erreur se produit, retourner une réponse d'erreur
                    return Response({"error": f"Erreur lors de la création de l'alerte ou notification: {str(e)}"},
                                    status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Présence enregistrée et vérification des absences effectuée."},
                        status=status.HTTP_201_CREATED)
class AlerteAbsenceViewSet(viewsets.ModelViewSet):
    queryset = AlerteAbsence.objects.all()
    serializer_class = AlerteAbsenceSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class RapportPDFViewSet(viewsets.ModelViewSet):
    queryset = RapportPDF.objects.all()
    serializer_class = RapportPDFSerializer


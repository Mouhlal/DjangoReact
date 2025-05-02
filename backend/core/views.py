from rest_framework import viewsets
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
        instance = serializer.save()

        # Vérifie s’il faut déclencher une alerte
        eleve = instance.eleve
        absences = Presence.objects.filter(eleve=eleve, present=False).count()
        SEUIL = 3  # seuil d'absences avant alerte

        if absences >= SEUIL:
            AlerteAbsence.objects.update_or_create(
                eleve=eleve,
                date=instance.date,
                defaults={'nbr_absences': absences}
            )

class AlerteAbsenceViewSet(viewsets.ModelViewSet):
    queryset = AlerteAbsence.objects.all()
    serializer_class = AlerteAbsenceSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class RapportPDFViewSet(viewsets.ModelViewSet):
    queryset = RapportPDF.objects.all()
    serializer_class = RapportPDFSerializer


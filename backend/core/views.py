from rest_framework import viewsets
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser


from .models import Eleve, Etude, Groupe, Presence, AlerteAbsence, Notification, RapportPDF , Matiere
from .serializers import (
    EleveSerializer, EtudeSerializer, GroupeSerializer,
    PresenceSerializer, AlerteAbsenceSerializer,
    NotificationSerializer, RapportPDFSerializer,
    MatiereSerializer
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
    parser_classes = (MultiPartParser, FormParser)

class PresenceViewSet(viewsets.ModelViewSet):
    serializer_class = PresenceSerializer
    queryset = Presence.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        # Filtrer par élève si présent
        eleve_id = params.get('eleve')
        if eleve_id:
            qs = qs.filter(eleve_id=eleve_id)

        # Filtrer par présent/absent si présent
        present = params.get('present')
        if present is not None:
            val = present.lower()
            if val in ('true', '1', 'yes'):
                qs = qs.filter(present=True)
            elif val in ('false', '0', 'no'):
                qs = qs.filter(present=False)

        return qs

    def perform_create(self, serializer):
        presence = serializer.save()

        # Si l'élève est absent, vérifier le seuil
        if not presence.present:
            start_date = timezone.now().date() - timedelta(days=7)
            abs_count = Presence.objects.filter(
                eleve=presence.eleve,
                present=False,
                date__gte=start_date
            ).count()

            if abs_count >= 5:
                AlerteAbsence.objects.update_or_create(
                    eleve=presence.eleve,
                    date=presence.date,
                    defaults={'nbr_absences': abs_count}
                )
                Notification.objects.create(
                    eleve=presence.eleve,
                    message=(
                        f"Votre enfant {presence.eleve.prenom} a été "
                        f"absent {abs_count} fois cette semaine."
                    ),
                    date=timezone.now()
                )
class AlerteAbsenceViewSet(viewsets.ModelViewSet):
    queryset = AlerteAbsence.objects.all()
    serializer_class = AlerteAbsenceSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        eleve_id = self.request.query_params.get('eleve')
        if eleve_id is not None:
            qs = qs.filter(eleve_id=eleve_id)
        return qs
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        eleve_id = self.request.query_params.get('eleve')
        if eleve_id is not None:
            qs = qs.filter(eleve_id=eleve_id)
        return qs

class RapportPDFViewSet(viewsets.ModelViewSet):
    queryset = RapportPDF.objects.all()
    serializer_class = RapportPDFSerializer

class MatiereViewSet(viewsets.ModelViewSet):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        filiere_id = self.request.query_params.get('filiere_id')
        if filiere_id:
            qs = qs.filter(filiere_id=filiere_id)
        return qs
    

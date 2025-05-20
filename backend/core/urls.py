from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EtudeViewSet, GroupeViewSet, EleveViewSet,
    PresenceViewSet, AlerteAbsenceViewSet,
    NotificationViewSet, RapportPDFViewSet ,
    MatiereViewSet 
)

router = DefaultRouter()
router.register(r'etudes', EtudeViewSet)
router.register(r'groupes', GroupeViewSet)
router.register(r'eleves', EleveViewSet)
router.register(r'presences', PresenceViewSet)
router.register(r'alertes', AlerteAbsenceViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'rapports', RapportPDFViewSet)
router.register(r'matieres', MatiereViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


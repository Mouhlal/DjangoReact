from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EtudeViewSet, GroupeViewSet, EleveViewSet,
    PresenceViewSet, AlerteAbsenceViewSet,
    NotificationViewSet, RapportPDFViewSet ,
    MatiereViewSet 
)
from .views import register_view, login_view, logout_view 

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
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]


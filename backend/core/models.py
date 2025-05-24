from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_eleve = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)


class Etude(models.Model):
    filiere = models.CharField(max_length=100)

    def __str__(self):
        return self.filiere


class Groupe(models.Model):
    groupeName = models.CharField(max_length=100)
    filiere = models.ForeignKey(Etude, on_delete=models.CASCADE, related_name='groupes')

    def __str__(self):
        return self.groupeName

class Eleve(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='eleve_profile', null=True, blank=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    filiere = models.ForeignKey(Etude, on_delete=models.CASCADE, related_name='eleves')
    groupe = models.ForeignKey(Groupe, on_delete=models.CASCADE, related_name='eleves')
    email_parent = models.EmailField()
    image = models.ImageField(upload_to='eleves/', null=True, blank=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Matiere(models.Model):
    nom = models.CharField(max_length=100)
    filiere = models.ForeignKey(Etude, on_delete=models.CASCADE, related_name='matieres')

    def __str__(self):
        return self.nom


class Presence(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='presences')
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE, related_name='presences')
    date = models.DateField()
    sceance = models.CharField(max_length=100)
    present = models.BooleanField()

    class Meta:
        unique_together = ('eleve', 'matiere', 'date', 'sceance')

    def __str__(self):
        return f"{self.eleve.nom} {self.eleve.prenom} - {self.matiere.nom} - {self.date} - {'Présent' if self.present else 'Absent'}"

class AlerteAbsence(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='alertes')
    date = models.DateField()
    nbr_absences = models.IntegerField()

    def __str__(self):
        return f"Alerte - {self.eleve.nom} {self.eleve.prenom} - {self.nbr_absences} absences"


class RapportAbsence(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='rapports')
    date = models.DateField()
    message = models.TextField()
    date_envoi = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Rapport - {self.eleve.nom} {self.eleve.prenom}"


class Notification(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE, related_name='notifications')
    date = models.DateField()
    message = models.TextField()
    date_envoi = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Notification - {self.eleve.nom} {self.eleve.prenom}"
class RapportPDF(models.Model):
    eleve = models.ForeignKey(Eleve, on_delete=models.CASCADE)
    fichier_pdf = models.FileField(upload_to='rapports/')
    date_creation = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Rapport PDF - {self.eleve.nom} {self.eleve.prenom} - {self.date_creation}"
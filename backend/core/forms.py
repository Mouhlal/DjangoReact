from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User

class EleveRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_eleve = True
        if commit:
            user.save()
        return user

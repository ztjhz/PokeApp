from django.urls import path
from . import views

urlpatterns = [
    path('unownedpokemon/', views.get_unowned_pokemon),
    path('mypokemon/', views.get_user_pokemon),
    path('allpokemon/', views.get_all_pokemon),
    path('addpokemon/', views.add_pokemon),
    path('releasepokemon/', views.release_pokemon),
]

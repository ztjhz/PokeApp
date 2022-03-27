from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate

from pokemon.models import Pokemon, UserPokemon, UserAccount
import json
from random import randint


def get_unowned_pokemon(request):
    """ 
    pokemon/unownedpokemon/
    GET request 
    Return a serialised list of all the pokemon that the user does not currently own
    """
    data = json.loads(request.body)
    username = data['username']
    print(username)
    user = UserAccount.objects.get(username=username)
    pokemon = [poke.name for poke in Pokemon.objects.all()]
    user_pokemon = [poke.pokemon.name for poke in user.user_pokemon.all()]
    new_pokemon = list(set(pokemon) - set(user_pokemon))
    return JsonResponse(sorted(new_pokemon), safe=False)


def get_user_pokemon(request):
    """ 
    pokemon/mypokemon/ 
    GET request 
    Return a serialised list of the pokemon owned by the user
    """
    if not request.body:
        return HttpResponse("username or password not posted")
    data = json.loads(request.body)
    username = data['username']
    user = UserAccount.objects.get(username=username)
    user_pokemon = []
    for poke in user.user_pokemon.all():
        stats = {}
        stats['id'] = poke.id
        stats['name'] = poke.pokemon.name
        stats['level'] = poke.level
        stats['hp'] = poke.pokemon.hp
        stats['attack'] = poke.pokemon.attack
        stats['defense'] = poke.pokemon.defense
        stats['type'] = poke.pokemon.type
        user_pokemon.append(stats)
    return JsonResponse(user_pokemon, safe=False)


def get_all_pokemon(request):
    """ 
    pokemon/allpokemon/ 
    GET request 
    Return a serialised list of all pokemon in the dataset
    """
    pokemon = [poke.name for poke in Pokemon.objects.all()]
    return JsonResponse(sorted(pokemon), safe=False)


def add_pokemon(request):
    """
    pokemon/addpokemon/
    POST request 
    Add a pokemon to the user’s collection
    """
    data = json.loads(request.body)
    pokemon_name = data["pokemon"]
    username = data["username"]

    user = UserAccount.objects.get(username=username)
    pokemon = Pokemon.objects.get(name=pokemon_name)
    user_pokemon = UserPokemon(user=user,
                               pokemon=pokemon,
                               level=randint(1, 100))
    user_pokemon.save()
    return HttpResponse('success')


def release_pokemon(request):
    """
    pokemon/releasepokemon/
    POST request
    Allow a user to discard one of his pokemons in his collection
    """
    data = json.loads(request.body)
    pokemon_name = data["pokemon"]
    username = data["username"]
    user_pokemon_id = data["id"]

    user = UserAccount.objects.get(username=username)
    pokemon = Pokemon.objects.get(name=pokemon_name)
    user_pokemon = UserPokemon.objects.get(user=user,
                                           pokemon=pokemon,
                                           id=user_pokemon_id)
    user_pokemon.delete()
    return HttpResponse('success')
from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class Pokemon(models.Model):
    name = models.CharField(max_length=50)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class UserAccountManager(BaseUserManager):
    def create_user(self, username, password=None):
        # password is defaulted to None as django does not allow users to be created without a password
        if not username:
            raise ValueError('User must have a username')

        user = self.model(username=username)
        user.set_password(password)
        user.save()

        return user

    def create_super_user():
        pass


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    USERNAME_FIELD = 'username'
    objects = UserAccountManager()

    def __str__(self):
        return self.username


class UserPokemon(models.Model):
    user = models.ForeignKey(UserAccount,
                             on_delete=models.CASCADE,
                             related_name="user_pokemon")
    pokemon = models.ForeignKey(Pokemon,
                                on_delete=models.CASCADE,
                                related_name="pokemon_users")
    level = models.IntegerField(default=50)

from django.contrib.auth.models import User
from rest_framework import serializers
from stud_db.models import Group, Student


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        field = (
            'surname', 'first_name', 'patronymic',
            'date_birthday', 'card_number', 'group'
        )


class GroupSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Group
        field = ('elder', 'name')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'students')
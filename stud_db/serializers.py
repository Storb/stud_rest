from django.contrib.auth.models import User
from rest_framework import serializers
from stud_db.models import Group, Student


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        owner = serializers.ReadOnlyField(source='owner.username')
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
    students = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Student.objects.all()
    )
    # students = serializers.HyperlinkedRelatedField(
    #     many=True, view_name='student-detail', read_only=True
    # )

    class Meta:
        model = User
        fields = ('id', 'username', 'students')
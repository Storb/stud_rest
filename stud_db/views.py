from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from stud_db.models import Group, Student
from stud_db.serializers import GroupSerializer, StudentSerializer, UserSerializer
from rest_framework import permissions
from stud_db.permissions import IsOwnerOrReadOnly
from rest_framework import viewsets

@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users': reverse('users', request=request, format=format),
        'groups': reverse('groups', request=request, format=format),
    })


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Group
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated,
                          IsOwnerOrReadOnly,)


class UsersList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     This viewset automatically provide 'list','create', 'retrieve'
#     'update' and 'destroy' action
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#
#
# class StudentViewSet(viewsets.ModelViewSet):
#     """
#     <pre>
#     {
#         'first_name':'Misha'
#         'last_name':'Petrov'
#         'surname': 'Goblin'
#         'card_number': '123456789'
#         'date_birthday': '1989-06-13'
#     }
#     </pre>
#     """
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
#
#
# class UserViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     This viewset automatically provide 'list' and 'detail' action
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer




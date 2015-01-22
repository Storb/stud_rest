from django.conf.urls import url, patterns, include
from django.views.generic.base import TemplateView
from stud_db import views

urlpatterns = patterns('',
    url(r'^home/', TemplateView.as_view(template_name='index.html')),
    url(r'^api/$', views.api_root),
    url(r'^api/groups/$', views.GroupList.as_view(), name='groups'),
    url(r'^api/groups/(?P<pk>[0-9]+)/$', views.GroupDetail.as_view(), name='group-detail'),
    url(r'^api/users/$', views.UsersList.as_view(), name='users'),
    url(r'^api/users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^api/students/(?P<pk>[0-9]+)/$', views.StudentDetail.as_view(), name='students-detail'),
    url(r'^api/students/$', views.StudentList.as_view(), name='students'),
)



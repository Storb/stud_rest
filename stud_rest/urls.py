from django.conf.urls import patterns, include, url
from django.contrib import admin
# from stud_db import urls as stud_db_urls
from stud_db import views
from django.views.generic.base import TemplateView

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'stud_rest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^api/', include(stud_db_urls, namespace='stud_db_urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^groups/$', views.GroupList.as_view(), name='groups'),
    url(r'^groups/(?P<pk>[0-9]+)/$', views.GroupDetail.as_view(), name='group-detail'),
    url(r'^users/$', views.UsersList.as_view(), name='users'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^students/(?P<pk>[0-9]+)/$', views.StudentDetail.as_view(), name='students-detail'),
    url(r'^students/$', views.StudentList.as_view(), name='students'),
    url(r'^home/', TemplateView.as_view(template_name='index.html')),
    url(r'^api/', views.api_root, name='api'),
)

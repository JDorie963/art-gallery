"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin

'''
Imports functions for defining URL patterns.
re_path is used for regular expression-based routing.
'''
from django.urls import path, include, re_path
from artgallery.views import *
from django.conf import settings
from django.conf.urls.static import static

'''
A list that holds all the URL patterns for the application.
Each URL pattern is mapped to a view
'''
urlpatterns = [
      path('admin/', admin.site.urls),
      re_path(r'^api/gallaries/$', GallaryListView.as_view()),
      re_path(r'^api/gallaries/(?P<pk>\d+)/$', GallaryView.as_view()),
      re_path(r'^api/targetfiles/$', TargetFileListView.as_view()),
      re_path(r'^api/targetfiles/(?P<pk>\d+)/$', TargetFileView.as_view()),
      re_path(r'^api/items/$', ItemListView.as_view()),
      re_path(r'^api/items/(?P<pk>\d+)/$', ItemView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



'''
re_path is used for API endpoints
with dynamic URL patterns. It uses
regular expressions to capture variables from the URL,
such as pk (primary key):
    /api/gallaries/: Maps to GallaryListView (list or create galleries).
    /api/gallaries/(?P<pk>\d+)/: Maps to GallaryView for a specific gallery based on the primary key (pk).
    /api/targetfiles/: Maps to TargetFileListView (list or create target files).
    /api/targetfiles/(?P<pk>\d+)/: Maps to TargetFileView for a specific target file.
    /api/items/: Maps to ItemListView (list or create items).
    /api/items/(?P<pk>\d+)/: Maps to ItemView for a specific item.
'''


'''
+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT):
This serves media files (e.g., images, videos) during development
when MEDIA_URL and MEDIA_ROOT are configured in settings.py.
'''
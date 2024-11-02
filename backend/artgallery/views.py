from __future__ import unicode_literals
from .serializers import *
from .models import *
from django.http import Http404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

'''
ListCreateAPIView: A view that provides
GET and POST methods for listing and creating objects.

RetrieveUpdateDestroyAPIView:
    A view that provides GET, PUT, PATCH, and DELETE methods
    for retrieving,updating, and deleting an object.
'''
from selenium import webdriver
import os
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import TimeoutException
import time


# Create your views here.

class GallaryListView(ListCreateAPIView):
    queryset = Gallary.objects.all()
    serializer_class = GallarySerializer

class GallaryView(RetrieveUpdateDestroyAPIView):
    serializer_class = GallarySerializer
    queryset = Gallary.objects.all()

class ItemListView(ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemView(RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class TargetFileView(RetrieveUpdateDestroyAPIView):
    serializer_class = TargetFileSerializer
    queryset = TargetFile.objects.all()

class TargetFileListView(ListCreateAPIView):
    queryset = TargetFile.objects.all()
    serializer_class = TargetFileSerializer
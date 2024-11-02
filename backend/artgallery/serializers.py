

from rest_framework import seializer
from .models import *


class ItemSerialiazer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'gallary_id','target_index',
                  'target_image', 'target_data', 'title',
                  'description', 'audio','audio_name',
                  'augmented_video', 'extra_video')
        
        
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('id', 'username', 'password',
                  'name', 'email', 'image','address',
                  'contact', 'description')


class TargetFileSerializer():
    class Meta:
        model = TargetFile
        fields = ('id', 'file')
# i love you
# Love you even more ...
from django.urls import re_path
from .views import TestListView
test_url_patterns = [
    re_path(r'^testlist/$', TestListView.as_view(), name='test-list'),
]
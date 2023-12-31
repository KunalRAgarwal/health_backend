"""
URL configuration for django_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path,re_path
from django.urls import include
from login.urls import login_url_patterns
from tests.urls import test_url_patterns
from bills.urls import bill_url_patterns
from django.views.generic import TemplateView
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(login_url_patterns)),
    path('api/', include(bill_url_patterns)),
    path('api/',include(test_url_patterns)),
    # re_path(r"^login/$", TemplateView.as_view(template_name="index.html")),
    re_path(r".*", TemplateView.as_view(template_name="index.html")) # RegExpr: any character is correct
]

from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers

from fortunes.views import FortuneAPI


admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'fortune', FortuneAPI)

urlpatterns = patterns('',
    url(r'^$', 'fortunes.views.home', name='home'),
    url(r'^seeking/$', 'fortunes.views.seeking', name='seeking'),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
)

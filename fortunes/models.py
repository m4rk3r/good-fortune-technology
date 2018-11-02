from __future__ import unicode_literals

from django.db import models


class Fortune(models.Model):
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    contributor = models.CharField(max_length=255, blank=True, null=True)

    def __unicode__(self):
        return unicode(self.id)

    class Meta:
        ordering = ('-created',)

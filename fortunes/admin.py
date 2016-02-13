from django.contrib import admin

from models import Fortune

class FortuneAdmin(admin.ModelAdmin):
    list_display = ('id','created')


admin.site.register(Fortune,FortuneAdmin)

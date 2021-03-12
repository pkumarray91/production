from django.contrib.auth import authenticate
from rest_framework import serializers
from django.core.mail import EmailMessage


def get_and_authenticate_user(email, password,is_deleted):
    user = authenticate(username=email, password=password ,is_deleted=is_deleted)
    if user is None:
        raise serializers.ValidationError("Invalid username/password. Please try again!")
    return user


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.send()
# from django.contrib.auth import authenticate
# from rest_framework import serializers
# from django.core.mail import EmailMessage
#
#
# def get_and_authenticate_user(email, password):
#     user = authenticate(username=email, password=password)
#     if user is None:
#         raise serializers.ValidationError("Invalid username/password. Please try again!")
#     return user
#

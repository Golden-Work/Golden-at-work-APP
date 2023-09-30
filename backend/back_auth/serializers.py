from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def validate_password(self, value):
        # validate that the password is at least 8 characters long, and has at least 1 digit and 1 uppercase letter, and 1 lowercase letter
        errors = []
        if len(value) < 8:
            errors.append('La contraseña debe tener al menos 8 caracteres')

        if not any(char.isdigit() for char in value):
            errors.append('La contraseña debe tener al menos 1 número')

        if not any(char.isupper() for char in value):
            errors.append(
                'La contraseña debe tener al menos 1 letra mayúscula')

        if not any(char.islower() for char in value):
            errors.append(
                'La contraseña debe tener al menos 1 letra minúscula')

        if errors:
            raise serializers.ValidationError(errors)

        return value

    def update(self, instance, validated_data):
        # don't update password or email
        validated_data.pop('password', None)
        validated_data.pop('email', None)
        return super().update(instance, validated_data)

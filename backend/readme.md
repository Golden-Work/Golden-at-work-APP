# Backend in django

## Installation
Clone the repository
```bash
git clone https://github.com/Gylg4m3sh/Golden-at-work-APP.git
```

cd into backend
```bash
cd backend
```

Create a virtual environment
```bash
virtualenv myenv
```
or
```bash
python -m venv myenv
```

Activate the virtual environment, this will depend on the platform you use, for UNIX-based systems, use
```bash
source myenv/bin/activate
```

Install dependencies
```bash
pip install -r requirements.txt
```

Run migrations in local sqlite database
```bash
python manage.py migrate
```

Create superuser
```bash
python manage.py createsuperuser
```

Start local development server
```bash
python manage.py runserver
```

FROM python:3.10-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./sql_app /code/sql_app
COPY ./privkey.pem /code/privkey.pem
COPY ./fullchain.pem /code/fullchain.pem

CMD ["uvicorn", "sql_app.main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/code/privkey.pem", "--ssl-certfile", "/code/fullchain.pem"]


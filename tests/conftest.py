import os
import pytest
import sys

root = os.path.abspath(os.path.join(
    os.path.dirname(__file__), os.pardir, os.pardir
))
if root not in sys.path:
    sys.path.insert(0, root)

from sqlalchemy import event
from sqlalchemy.orm import Session

from blog.config import create_app, db


@pytest.fixture(scope='session')
def app(request):
    app = create_app(
        SQLALCHEMY_DATABASE_URI='sqlite:///',
    )
    app_context = app.test_request_context()
    app_context.push()

    request.addfinalizer(app_context.pop)

    return app


@pytest.fixture(scope='session', autouse=True)
def setup_db(request, app):
    db.create_all()

    @event.listens_for(Session, "after_transaction_end")
    def restart_savepoint(session, transaction):
        if transaction.nested and not transaction._parent.nested:
            session.begin_nested()


@pytest.fixture(autouse=True)
def db_session(request):
    request.addfinalizer(db.session.remove)

    db.session.begin_nested()


@pytest.fixture(scope='session')
def client(app):
    return app.test_client()

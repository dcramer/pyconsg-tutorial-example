import logging
import warnings

from flask import Flask
from flask.ext.restful import Api
from flask.ext.sqlalchemy import SQLAlchemy
from raven.contrib.flask import Sentry
from sqlalchemy.exc import SAWarning

# ensure sqlalchemy warnings bubble up to errors
warnings.simplefilter('error', SAWarning)

api = Api(prefix='/api/0')

db = SQLAlchemy()

sentry = Sentry(logging=True, level=logging.ERROR)


def create_app(**config):
    app = Flask(__name__)
    app.config.update(config)

    api.init_app(app)
    db.init_app(app)
    sentry.init_app(app)

    configure_web_routes(app)
    configure_api_routes(app)


def configure_web_routes(app):
    from .web.index import IndexView

    app.add_url_rule(
        '/<path:path>', view_func=IndexView.as_view('index-path'))
    app.add_url_rule(
        '/', view_func=IndexView.as_view('index'))


def configure_api_routes(app):
    from .api.post_details import PostDetailsEndpoint
    from .api.post_index import PostIndexEndpoint

    api.add_resource(PostIndexEndpoint, '/posts/')
    api.add_resource(PostDetailsEndpoint, '/posts/<int:post_id>/')


if __name__ == '__main__':
    app = create_app()
    app.run()

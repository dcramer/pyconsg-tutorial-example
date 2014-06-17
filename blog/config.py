import logging
import os
import warnings

from flask import Flask
from flask.ext.restful import Api
from flask.ext.sqlalchemy import SQLAlchemy
from raven.contrib.flask import Sentry
from sqlalchemy.exc import SAWarning

from blog.constants import PROJECT_ROOT

import blog.models


# ensure sqlalchemy warnings bubble up to errors
warnings.simplefilter('error', SAWarning)

api = Api(prefix='/api/0')

db = SQLAlchemy()

sentry = Sentry(logging=True, level=logging.ERROR)


def create_app(**config):
    app = Flask(
        __name__,
        static_folder=os.path.join(PROJECT_ROOT, 'static'),
        template_folder=os.path.join(PROJECT_ROOT, 'templates'),
    )

    app.config['INDUCE_API_DELAY'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/blog.db'
    app.config['DEBUG'] = True

    app.config.update(config)

    db.init_app(app)
    sentry.init_app(app)

    configure_api_routes(app)
    configure_web_routes(app)

    return app


def configure_web_routes(app):
    from .web.index import IndexView

    app.add_url_rule(
        '/<path:path>', view_func=IndexView.as_view('index-path'))
    app.add_url_rule(
        '/', view_func=IndexView.as_view('index'))


def configure_api_routes(app):
    from .api.post_details import PostDetailsResource
    from .api.post_index import PostIndexResource

    api.add_resource(PostIndexResource, '/posts/')
    api.add_resource(PostDetailsResource, '/posts/<post_id>/')

    api.init_app(app)


if __name__ == '__main__':
    app = create_app()
    app.run()

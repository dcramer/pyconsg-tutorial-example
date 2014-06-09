from flask import Flask


def create_app(**config):
    app = Flask(__name__)
    app.config.update(config)

    configure_routes(app)


def configure_routes(app):
    from web.index import IndexView

    app.add_url_rule(
        '/<path:path>', view_func=IndexView.as_view('index-path'))
    app.add_url_rule(
        '/', view_func=IndexView.as_view('index'))


if __name__ == '__main__':
    app = create_app()
    app.run()

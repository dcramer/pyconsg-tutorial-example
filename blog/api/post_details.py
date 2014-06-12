from __future__ import absolute_import, division, unicode_literals

from flask.ext.restful import reqparse, Resource

from blog.config import db
from blog.models import Post


class PostDetailsResource(Resource):
    def _get_post(self, post_id):
        if not post_id.isdigit():
            return None

        return Post.query.get(post_id)

    def get(self, post_id):
        """
        Return information about a given post.
        """
        post = self._get_post(post_id)
        if post is None:
            return '', 404

        return {
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'pubDate': post.pub_date.isoformat(),
        }

    post_parser = reqparse.RequestParser()
    post_parser.add_argument('title', required=False)
    post_parser.add_argument('body', required=False)

    def post(self, post_id):
        """
        Edit an existing post.
        """
        post = self._get_post(post_id)
        if post is None:
            return '', 404

        args = self.post_parser.parse_args()

        if args.title:
            post.title = args.title
            db.session.add(post)

        if args.body:
            post.body = args.body
            db.session.add(post)

        if db.session.is_modified(post):
            db.session.commit()

        return {
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'pubDate': post.pub_date.isoformat(),
        }, 200

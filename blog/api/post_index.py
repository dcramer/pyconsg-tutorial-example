from __future__ import absolute_import, division, unicode_literals

from flask.ext.restful import reqparse

from blog.api.base import Resource
from blog.config import db
from blog.models import Post


class PostIndexResource(Resource):
    get_parser = reqparse.RequestParser()
    get_parser.add_argument('page', type=int, location='args')

    def get(self):
        """
        Return a list of posts.
        """
        args = self.get_parser.parse_args()

        page = args.page or 0
        limit = 10

        start = page * limit
        end = start + limit

        post_list = Post.query.order_by(
            Post.pub_date.desc()
        )[start:end]

        results = []
        for post in post_list:
            results.append({
                'id': post.id,
                'title': post.title,
                'pubDate': post.pub_date.isoformat(),
            })

        return results, 200

    post_parser = reqparse.RequestParser()
    post_parser.add_argument('title', required=True)
    post_parser.add_argument('body', required=True)

    def post(self):
        """
        Create a new post.
        """
        args = self.post_parser.parse_args()

        post = Post(
            title=args.title,
            body=args.body,
        )
        db.session.add(post)
        db.session.commit()

        return {
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'pubDate': post.pub_date.isoformat(),
        }, 201

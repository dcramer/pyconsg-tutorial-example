from __future__ import absolute_import, division, unicode_literals

from flask.ext.restful import reqparse, Resource

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

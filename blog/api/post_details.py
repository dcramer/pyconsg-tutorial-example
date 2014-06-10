from __future__ import absolute_import, division, unicode_literals

from flask.ext.restful import Resource


class PostDetailsResource(Resource):
    def get(self, post_id):
        """
        Return information about a given post.
        """
        return {}, 200

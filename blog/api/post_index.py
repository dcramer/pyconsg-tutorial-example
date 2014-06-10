from __future__ import absolute_import, division, unicode_literals

from flask.ext.restful import Resource


class PostIndexResource(Resource):
    def get(self, post_id):
        """
        Return a list of posts.
        """
        return [], 200

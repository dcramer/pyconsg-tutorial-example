import json

from blog.config import db
from blog.models import Post


def test_invalid_post_on_get(client):
    resp = client.get('/api/0/posts/1/')

    assert resp.status_code == 404


def test_valid_post_on_get(client):
    post = Post(
        title='Hello world!',
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    )
    db.session.add(post)
    db.session.commit()

    resp = client.get('/api/0/posts/{0}/'.format(post.id))

    assert resp.status_code == 200
    assert resp.headers['Content-Type'] == 'application/json', resp.data
    assert json.loads(resp.data.decode('utf-8')) == {
        'id': post.id,
        'title': post.title,
        'body': post.body,
        'pubDate': post.pub_date.isoformat(),
    }


def test_invalid_post_on_post(client):
    resp = client.post('/api/0/posts/1/')

    assert resp.status_code == 404


def test_valid_params_on_post(client):
    post = Post(
        title='Hello world!',
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    )
    db.session.add(post)
    db.session.commit()

    resp = client.post('/api/0/posts/{0}/'.format(post.id), data={
        'title': 'New Title',
    })

    assert resp.status_code == 200
    assert resp.headers['Content-Type'] == 'application/json', resp.data
    assert json.loads(resp.data.decode('utf-8')) == {
        'id': post.id,
        'title': 'New Title',
        'body': post.body,
        'pubDate': post.pub_date.isoformat(),
    }

    resp = client.post('/api/0/posts/{0}/'.format(post.id), data={
        'body': 'New Body',
    })

    assert resp.status_code == 200
    assert resp.headers['Content-Type'] == 'application/json', resp.data
    assert json.loads(resp.data.decode('utf-8')) == {
        'id': post.id,
        'title': 'New Title',
        'body': 'New Body',
        'pubDate': post.pub_date.isoformat(),
    }

    db.session.refresh(post)

    assert post.title == 'New Title'
    assert post.body == 'New Body'

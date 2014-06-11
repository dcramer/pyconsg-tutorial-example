::

	mkvirtualenv -p `which python3` pyconsg-tutorial
	pip install -e .
	bin/create-db
	bin/load-mocks
	bin/web

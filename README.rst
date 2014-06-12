Setup the environment:

::

	mkvirtualenv -p `which python3` pyconsg-tutorial
	pip install -e .


Initialize the database:

::
	bin/create-db


Load some dummy data:

::

	bin/load-mocks


Start the webserver:

::

	bin/web


Run Python tests:

::

	py.test


Run JavaScript tests:

::

	npm run test


Run Selenium end-to-end tests:

::

	npm run protractor

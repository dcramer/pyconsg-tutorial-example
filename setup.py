"""
pyconsg-tutorial
================

"""

from setuptools import setup, find_packages

tests_require = [
    'flake8>=2.1.0,<2.2.0',
    'mock>=1.0.1,<1.1.0',
    'pytest>=2.5.0,<2.6.0',
    'pytest-cov>=1.6,<1.7',
    'pytest-xdist>=1.9,<1.10',
]

install_requires = [
    'blinker>=1.3,<1.4',
    'flask>=0.10.1,<0.11.0',
    'flask-restful>=0.2.10,<0.2.11',
    'flask-sqlalchemy>=1.0,<1.1',
    'raven>=4.0.4,<4.1.0',
    'python-dateutil>=2.1,<2.2',
    'sqlalchemy==0.9.4',
]


setup(
    name='pyconsg-tutorial',
    version='0.0.0',
    description='',
    long_description=__doc__,
    packages=find_packages(),
    zip_safe=False,
    install_requires=install_requires,
    extras_require={'tests': tests_require},
    tests_require=tests_require,
    include_package_data=True,
    classifiers=[
        '__DO NOT UPLOAD__',
    ],
)

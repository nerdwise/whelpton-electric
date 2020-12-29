#!/usr/bin/env python
import json
import threading
import time
import grow
import requests
from concurrent import futures
from protorpc import messages

REFRESH_TOKEN_URL = "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={access_token}"
MEDIA_REQUEST_URL = "" \
                "https://graph.instagram.com/me/media" \
                "?fields=media_url" \
                "&access_token={access_token}"

class InstaPreprocessor(grow.Preprocessor):
    KIND = 'insta'

    class Config(messages.Message):
        path = messages.StringField(1)
        access_token = messages.StringField(2)
        client_secret = messages.StringField(3)

    def __init__(self, *args, **kwargs):
        super(InstaPreprocessor, self).__init__(*args, **kwargs)
        self.lock = threading.RLock()

    def run(self, build=True):
        # Refresh the token
        requests.get(
            REFRESH_TOKEN_URL.format(access_token=self.config.access_token))

        # Pull the photos
        media_request_url = MEDIA_REQUEST_URL.format(
            access_token=self.config.access_token)
        media_response = requests.get(media_request_url)
        if media_response.status_code != 200:
            self.pod.logger.error(
                'Failed to fetch insta media',
                media_response.status_code)

        media_response_data = json.loads(media_response.content)[u'data']

        self._save_results(media_response_data)
        self.pod.logger.info('Fetched insta')

    def _save_results(self, results):
        path = self.config.path

        # Prefer JSON here over YAML. JSON is significantly faster and handles
        # unicode parsing better than YAML does.
        content = json.dumps(results, indent=2, sort_keys=True)

        self.pod.logger.info('saving results to %s', path)
        self.pod.write_file(path, content)

    def _parse_response(self, content):
        for result in results:
            for key, val in result.iteritems():
                if not isinstance(val, basestring):
                    continue
                # Convert unicode to byte string.
                if isinstance(val, unicode):
                    val = val.encode('utf-8')
                    result[key] = val
                # Re-write URLs that lead with '//' to 'https://'.
                if key.endswith('_url') and val.startswith('//'):
                    result[key] = 'https:{}'.format(val)
        return results

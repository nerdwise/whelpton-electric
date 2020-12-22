# #!/usr/bin/env python
#
# """Downloads a list of Cast apps/partners from the Eureka API."""
#
# import json
# import threading
# import time
# import grow
# import requests
# from concurrent import futures
# from protorpc import messages
#
# # Eureka's locale is formatted as "{country}.{lang}".
# _EUREKA_URL_FORMAT = 'https://www.gstatic.com/eureka/apps/apps.{locale}.js'
# _LOCALE_OVERRIDES = {
#     'nb_NO': 'no.no',
#     'zh_HK': 'hk.zh-hk',
#     'zh_Hant_HK': 'hk.zh-hk',
#     'zh_TW': 'tw.zh-tw',
#     'zh_Hant_TW': 'tw.zh-tw',
# }
#
#
# class EurekaPreprocessor(grow.Preprocessor):
#     KIND = 'eureka'
#
#     class Config(messages.Message):
#         path = messages.StringField(1)
#
#     def __init__(self, *args, **kwargs):
#         super(EurekaPreprocessor, self).__init__(*args, **kwargs)
#         self.lock = threading.RLock()
#
#     def run(self, build=True):
#         start = time.time()
#
#         locales = self._get_locales()
#         locale_futures = {}
#         pool = futures.ThreadPoolExecutor(max_workers=10)
#         for locale in locales:
#             eureka_locale = self._conv_locale(locale)
#             url = _EUREKA_URL_FORMAT.format(locale=eureka_locale)
#             future = pool.submit(requests.get, url)
#             locale_futures[future] = locale
#
#         for future in futures.as_completed(locale_futures):
#             locale = locale_futures[future]
#             response = future.result()
#             if response.status_code != 200:
#                 self.pod.logger.error(
#                     'failed to fetch apps for locale=%s. status=%d',
#                     locale, response.status_code)
#                 continue
#             data = self._parse_response(response)
#             self._save_results(locale, data)
#
#         elapsed = time.time() - start
#         self.pod.logger.info('done in %ss!', elapsed)
#
#     def _save_results(self, locale, results):
#         path = self.config.path.format(locale=locale)
#
#         # Prefer JSON here over YAML. JSON is significantly faster and handles
#         # unicode parsing better than YAML does.
#         content = json.dumps(results, indent=2, sort_keys=True)
#
#         self.pod.logger.info('saving results to %s', path)
#         self.pod.write_file(path, content)
#
#     def _parse_response(self, response):
#         # Remove the leading 'window.apps = ' and trailing ';'.
#         content = response.content[14:-1]
#         results = json.loads(content)
#
#         for result in results:
#             for key, val in result.iteritems():
#                 if not isinstance(val, basestring):
#                     continue
#                 # Convert unicode to byte string.
#                 if isinstance(val, unicode):
#                     val = val.encode('utf-8')
#                     result[key] = val
#                 # Re-write URLs that lead with '//' to 'https://'.
#                 if key.endswith('_url') and val.startswith('//'):
#                     result[key] = 'https:{}'.format(val)
#         return results
#
#     def _get_locales(self):
#         """Returns a list of Cast locales."""
#         locales = self.pod.read_yaml('/content/locales/chromecast.yaml')
#         return locales
#
#     def _conv_locale(self, grow_locale):
#         """Converts a grow locale (en_US) to a eureka locale (us.en)."""
#         if grow_locale in _LOCALE_OVERRIDES:
#             return _LOCALE_OVERRIDES[grow_locale]
#         lang, country = grow_locale.lower().split('_')
#         return '{}.{}'.format(country, lang)

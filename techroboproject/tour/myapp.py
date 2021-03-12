import json
import requests
URL ="http://127.0.0.1:8000/tour/tourcreation/"


def get_data(id=None):
    data={}
    if id is not None:
        data={'id':id}
    json_data=json.dumps(data)
    r =requests.post(url=URL,data=json_data)
    data=r.json()
    print(data)

get_data(1)
#
# def post_data():
#     data={
#
#             'id': 1,
#             'tour_name': 'pune-nasik',
#             'group_id': '1',
#             'start_point': 'pune',
#             'end_point': 'nasik',
#             'start_lat_lng':[{
#                 'lat':324.768,
#                 'lng':543.256
#             }],
#             'end_lat_lng':[{
#                 'lat':321.876,
#                 'lng':452.502
#             }],
#             'stops': '4',
#             'distance': '324km',
#             'estimate_time': '10:47:47.997584',
#             'time_with_stops': '10:47:47.997584',
#             'is_deleted': 'False'
#
#     }
#     json_data=json.dumps(data)
#     r =requests.post(url=URL,data=json_data)
#     data=r.json()
#     print(data)

#post_data()
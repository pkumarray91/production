from rest_framework.views import APIView
from datetime import datetime
# Create your views here.
from django.contrib.auth import get_user_model
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from . import serializers
from .models import *
from .serializers import ResellerSerializer, UserRegisterSerializer, AuditSerializer,CompanySerializer,DeviceSerializer,VehicleSerializer,GroupSerializer,AllocateDeallocateSerializer
from .utils import get_and_authenticate_user
from rest_framework.parsers import MultiPartParser, FormParser

User = get_user_model()

from django.db.models import Q
class ResellerRegisterView(APIView):
    serializer_class = serializers.UserRegisterSerializer

    def get(self, request,pk=None):
        id=pk
        if id!=None:
            reseller_id=tblreseller.objects.get(reseller_id=id)
            print("reseller_id:",reseller_id)
            # user = User.objects.filter(Q(id=id) & Q(is_deleted=False) & Q(category_type='1'))
            # serializer = UserRegisterSerializer(user, many=True)
            user=User.objects.filter(Q(reseller=reseller_id.reseller_id) & Q(category_type='1')& Q(is_deleted=False))
            serializer =  UserRegisterSerializer(user,many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            reseller=tblreseller.objects.filter(is_deleted=False)
            print('reseller:',reseller)
            appenddata = []
            for data in reseller:
                user = User.objects.filter(Q(reseller=data.reseller_id) & Q(category_type='1') & Q(is_deleted=False))
                print("user:", user)
                serializer = UserRegisterSerializer(user, many=True)
                result = serializer.data
                print("result : ", result)
                # result['company_name'] = data.company_name
                resultdict = dict(result[0])
                resultdict['company_name'] = data.company_name
                appenddata.append(resultdict)
                print('appenddata:', appenddata)
            return Response(appenddata, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwarg):
        data = request.data
        print("data :", data)
        data['reseller_name'] = data['first_name'] + ' ' + data['last_name']
        # print("after data : ", data)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            user_data = serializer.data
            print("user_data : ", user_data)
            url = data['url']
            url = tblurl.objects.create(url=url)
            url.save()
            u = tblurl.objects.get(url=url)

            reseller_data = tblreseller.objects.create(reseller_name=data['reseller_name'],
                                    company_name=data['company_name'],contact_number=data['contact_number'],)
            reseller_data.save()

            reseller = tblreseller.objects.get(company_name=data['company_name'])
            reseller_add_data = ResellerSerializer(reseller, data={"reseller_url": u.url}, partial=True)
            reseller_add_data.is_valid()
            reseller_add_data.save()

            user = User.objects.get(email=data['email'])
            print("user : ", user)
            user_add_data = UserRegisterSerializer(user, data={"reseller": reseller.reseller_id, "user_url": u.url
                                                               },
                                                   partial=True)
            user_add_data.is_valid()
            user_add_data.save()
            print("user error : ", user_add_data)
            # mail send to change the password
            # auth_token = user_data['auth_token']
            # print(auth_token)
            # email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
            #                                                auth_token)
            # print('email_plaintext_message:', email_plaintext_message)
            # email_from = settings.EMAIL_HOST_USER
            # url = "http://localhost:3000/forget"
            # print('url:', url)
            # html_message = '<button><a href="' + url + '">click on Reset Password</a></button>'
            # email = user_data['email']
            #
            # send_mail(
            #     # title:
            #     "Password Reset for {title}".format(title="website title"),
            #     # message:
            #     email_plaintext_message,
            #     # from:
            #     email_from,
            #     # to:
            #     [email],
            #
            #     html_message=html_message
            # )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,pk):
        id = pk
        data = request.data
        print('data:', data)
        data['reseller_name'] = data['first_name'] + ' ' + data['last_name']
        # user = User.objects.get(pk=id)
        # print("user:", user)
        user = User.objects.get(pk=id)
        serializer = UserRegisterSerializer(user,
                                            data={'first_name': data['first_name'], 'last_name': data['last_name'],
                                                  'email': data['email'], 'contact_number': data['contact_number']},
                                            partial=True)
        serializer.is_valid()
        serializer.save()

        reseller = tblreseller.objects.get(reseller_id=user.reseller_id)
        print('reseller:', reseller)
        serializer = ResellerSerializer(reseller, data={'reseller_name': data['reseller_name'],
                                                        'company_name': data['company_name'],
                                                        'contact_number': data['contact_number']}, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def delete(self,request,pk):
        id=pk
        user=User.objects.get(Q(id=id) & Q(is_deleted=False) &Q(category_type='1'))
        print('user:',user)
        reseller_id=tblreseller.objects.get(Q(reseller_id=user.reseller_id) & Q(is_deleted=False))
        print('reseller_id:', reseller_id)
        reseller_id.is_deleted=True
        reseller_id.save()
        serializer=ResellerSerializer(reseller_id)
        return Response({'msg': 'delete success','data':serializer.data}, status=status.HTTP_200_OK)


class ResellerUserRegisterView(APIView):
    serializer_class = serializers.UserRegisterSerializer


    def get(self,request,pk=None):
        url=pk
        reseller = tblreseller.objects.get(reseller_url=url)
        print("reseller:",reseller)
        user=User.objects.filter(Q(reseller_id=reseller.reseller_id) &Q(is_deleted=False) &Q(user_type=1)).exclude(category_type='1')
        print("user:",user)
        serializer=UserRegisterSerializer(user,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print('data:', data)
        data['username'] = data['first_name'] + '' + data['last_name']
        serializer = serializers.UserRegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            reseller_id = tblreseller.objects.get(reseller_url=data['url'])
            print("reseller_id:", reseller_id)
            useradd = User.objects.get(email=data['email'])
            user = UserRegisterSerializer(useradd, data={"reseller": reseller_id.reseller_id,
                                                         'user_url': reseller_id.reseller_url,
                                                         "contact_number": data['contact_number']}, partial=True)
            user.is_valid()
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request,pk):
        id=pk
        data=request.data
        print('data:',data)
        user=User.objects.get(pk=id)
        print("user:",user)
        serializer=UserRegisterSerializer(user,data={'first_name':data['first_name'],'last_name':data['last_name'],
                                                     'email':data['email'],'contact_number':data['contact_number']})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        id=pk
        user = User.objects.get(Q(id=id) & Q(is_deleted=False))
        user.is_deleted=True
        user.save()
        serializer=UserRegisterSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)


class CompanyRegisterView(APIView):
    serializer_class = serializers.UserRegisterSerializer

    def get(self, request, pk):
        url = pk
        print("url : ", url)
        reseller = tblreseller.objects.get(reseller_url=url)
        company = tblcompany.objects.filter(Q(reseller_id=reseller.reseller_id) & Q(is_deleted=False))
        print("company : ", company)
        appenddata = []
        for data in company:
            user = User.objects.filter(Q(company=data.company_id) & Q(category_type='1') & Q(is_deleted=False))
            serializer = serializers.UserRegisterSerializer(user, many=True)
            result = serializer.data
            # print("result : ", result)
            # result['company_name'] = data.company_name
            resultdict = dict(result[0])
            resultdict['company_name'] = data.name
            appenddata.append(resultdict)
            # print('appenddata:', appenddata)
        return Response(appenddata, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print("data : ", data)
        data['company_user_name'] = data['first_name'] + ' ' + data['last_name']
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            user_data = serializer.data
            company_data = tblcompany.objects.create(name=data['name'], contact_number=data['contact_number']
                                                     )
            company_data.save()
            reseller = tblreseller.objects.get(reseller_url=data['url'])
            company = tblcompany.objects.get(name=data['name'])
            company_add_data = CompanySerializer(company, data={'reseller': reseller.reseller_id}, partial=True)
            company_add_data.is_valid()
            company_add_data.save()

            group_data = tblgroup.objects.create(group_name=data["name"])
            group_data.save()
            group = tblgroup.objects.get(group_name=data['name'])
            group_add_data = GroupSerializer(group, data={'company': company.company_id}, partial=True)
            group_add_data.is_valid()
            group_add_data.save()

            user = User.objects.get(email=data['email'])
            user_add_data = UserRegisterSerializer(user, data={
                'user_url': reseller.reseller_url,
                'company': company.company_id},
                                                   partial=True)
            user_add_data.is_valid()
            user_add_data.save()

            return Response( user_add_data.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        id = pk
        data = request.data
        print('data:', data)
        user = User.objects.get(id=id)
        print("company_id : ", user.company)
        # company_id = user.company
        company = tblcompany.objects.get(company_id=user.company_id)
        if data['contact_number'] != user.contact_number:
            u_serializer = UserRegisterSerializer(user, data={'contact_number': data['contact_number']}, partial=True)
            c_serializer = CompanySerializer(company, data={'contact_number': data['contact_number']}, partial=True)
            if u_serializer.is_valid() and c_serializer.is_valid():
                u_serializer.save()
                c_serializer.save()
                return Response(u_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        elif data['name'] != company.name:
            c_serializer = CompanySerializer(company, data={'name': data['name']}, partial=True)
            group = tblgroup.objects.get(company=company.company_id)
            g_serializer = GroupSerializer(group, data={'group_name': data['name']}, partial=True)
            if c_serializer.is_valid() and g_serializer.is_valid():
                c_serializer.save()
                g_serializer.save()
                return Response(c_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserRegisterSerializer(user,
                                                data={'first_name': data['first_name'], 'last_name': data['last_name'],
                                                      'email': data['email']},
                                                partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        id=pk
        user = User.objects.get(Q(id=id) & Q(is_deleted=False) & Q(category_type='1'))
        print('user:', user)
        company_id = tblcompany.objects.get(Q(company_id=user.company_id) & Q(is_deleted=False))
        print('company_id:',company_id)
        company_id.is_deleted = True
        company_id.save()
        serializer = CompanySerializer(company_id)
        return Response({'msg': 'delete success', 'data': serializer.data}, status=status.HTTP_200_OK)

class CompanyUserRegisterView(APIView):
    serializer_class = serializers.UserRegisterSerializer

    def get(self, request, pk=None):
        id = pk
        company_id = tblcompany.objects.get(company_id=id)
        print("company_id:", company_id)
        user = User.objects.filter(Q(company=company_id.company_id) & Q(is_deleted=False) & Q(user_type='2')).exclude(category_type='1')
        serializer = UserRegisterSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        data = request.data
        print('data:', data)
        data['username'] = data['first_name'] + '' + data['last_name']
        serializer = serializers.UserRegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            url_id = tblurl.objects.get(url=data['url'])
            print("url_id:", url_id)
            # reseller_id = tblreseller.objects.get(reseller_url=url_id.url)
            # print("reseller_id:", reseller_id)
            company_id = tblcompany.objects.get(company_id=data['company'])
            print('company_id:', company_id)
            useradd = User.objects.get(email=data['email'])
            user1 = UserRegisterSerializer(useradd, data={"company": company_id.company_id, "user_url": url_id.url,
                                                          "contact_number": data['contact_number']}, partial=True)
            user1.is_valid()
            user1.save()
            return Response(user1.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        id = pk
        data = request.data
        print('data:', data)
        user = User.objects.get(id=id)
        print("user:", user)
        serializer = UserRegisterSerializer(user,
                                            data={'first_name': data['first_name'], 'last_name': data['last_name'],
                                                  'email': data['email'],'category_type':data['category_type']},
                                            partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pk):
        id=pk
        user = User.objects.get(Q(id=id) & Q(is_deleted=False))
        user.is_deleted=True
        user.save()
        serializer=UserRegisterSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)


class DeviceRegisterView(APIView):
    def get(self, request, pk=None):
        url = pk
        reseller = tblreseller.objects.get(reseller_url=url)
        device = tbldevice.objects.filter(Q(reseller=reseller.reseller_id) & Q(is_deleted=False))
        serializer = DeviceSerializer(device, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request):
        data = request.data
        # print('data:', data)
        reseller = tblreseller.objects.get(reseller_url=data['url'])
        # print("reseller : ", reseller)
        device_data = tbldevice.objects.create(device_name=data['device_name'], device_type=data['device_type'],
                                               GSM_number=data['GSM_number'],
                                               ICCID_number=data['ICCID_number'], IMEI_number=data['IMEI_number'])
        # device_data.save()
        serializer = DeviceSerializer(device_data, data={'reseller': reseller.reseller_id}, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        id = pk
        data = request.data
        device_data = tbldevice.objects.get(device_id=id)
        serializer = DeviceSerializer(device_data, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        id=pk
        device_data=tbldevice.objects.get(Q(device_id=id) &Q(available="Yes"))
        device_data.is_deleted =True
        device_data.save()
        serializer=DeviceSerializer(device_data)
        return Response(serializer.data,status=status.HTTP_200_OK)


class CompanyVehicleRegisterView(APIView):
    def get(self,request,pk=None):
        company_id = pk
        print("company_id : ", company_id)
        vehicles = tblvehicle.objects.filter(Q(company=company_id) & Q(is_deleted=False))
        print("all vehicles : ", vehicles)
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data)


    def post(self, request):
        data = request.data
        print("data:",data)
        company_id = tblcompany.objects.get(company_id=data['company_id'])
        vehicle_data = tblvehicle.objects.create(vehicle_number=data['vehicle_number'],
                                                 vehicle_icons=data['vehicle_icons'],
                                                 vehicle_marker=data['vehicle_marker'],
                                                 description=data['description'],
                                                 )
        # # print('vehicle_data:', vehicle_data)
        vehicle_data.save()
        vehicle = VehicleSerializer(vehicle_data,
                                    data={'company': company_id.company_id},
                                    partial=True)
        if vehicle.is_valid():
            vehicle.save()
            return Response(vehicle.data, status=status.HTTP_201_CREATED)
        return Response(vehicle.errors, status=status.HTTP_200_OK)

    def put(self,request,pk):
        vehicle_id=pk
        data=request.data
        print("data:",data)
        vehicle=tblvehicle.objects.get(vehicle_id=vehicle_id)
        serializer=VehicleSerializer(vehicle,data={'vehicle_number':data['vehicle_number'],'vehicle_icons':data['vehicle_icons'],'vehicle_marker':data['vehicle_marker'],
                                                   'description':data['description']},partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        vehicle_id = pk
        vehicledata = tblvehicle.objects.get(vehicle_id=vehicle_id)
        print('vehicle_id:', vehicle_id)
        allocatevehicle= tblallocatedeallocate.objects.filter(Q(vehicle=vehicledata.vehicle_id) &Q(is_deleted=False) &Q(deallocate_on__isnull=True))
        print('allocatevehicle:', allocatevehicle)
        if allocatevehicle.exists():
            for allocatevehicles in allocatevehicle.iterator():
                print('allocatevehicles:',allocatevehicles)
                devicedata = tbldevice.objects.get(Q(device_id=allocatevehicles.device_id))
                print("devicedata:", devicedata)
                allocatedevice=tblallocatedeallocate.objects.filter(device=devicedata.device_id)
                print("allocatedevice:", allocatedevice)

                if allocatedevice.exists():
                    return Response({"message": "please first you want to deallocate the device"})
        else:
            vehicledata.is_deleted = True
            vehicledata.save()
            serializer = VehicleSerializer(vehicledata)
            return Response({'message':"company vehicle deleted"})

class VehicleView(APIView):
    def get(self, request, pk=None,urldata=None):
        if urldata != None:
            print('urldata:', urldata)
            reseller_data = tblreseller.objects.get(Q(reseller_url=urldata) & Q(is_deleted=False))
            # print('reseller_data:', reseller_data)
            company_data = tblcompany.objects.filter(Q(reseller=reseller_data.reseller_id) & Q(is_deleted=False))
            # print('company_data:', company_data)
            append_data = []
            for company_datas in company_data:
                # print('company_datas:', company_datas)
                vehicle_data = tblvehicle.objects.filter(Q(company=company_datas.company_id))
                # print('vehicle_data:', vehicle_data)
                serializer = VehicleSerializer(vehicle_data, many=True)
                result = serializer.data
                # print('result:', result)
                if result != []:
                    for i in range(0, len(result)):
                        resultdict = dict(result[i])
                        append_data.append(resultdict)
                # print('append data:', append_data)

            return Response(append_data, status=status.HTTP_200_OK)
        else:
            company_id = pk
            vehicle = tblvehicle.objects.filter(Q(company_id=company_id) & Q(is_deleted=False))
            serializer = VehicleSerializer(vehicle, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class DeallocateView(APIView):
    def get(self, request, pk=None):
        company_id = pk
        print("company_id : ", company_id)
        vehicles = tblvehicle.objects.filter(Q(company=company_id) & Q(is_deleted=False))
        print("all vehicles : ", vehicles)
        appenddata = []
        for vehicle in vehicles:
            print(" all for vehicle :", vehicle)
            allocatedeallocates = tblallocatedeallocate.objects.filter(
                Q(vehicle=vehicle.vehicle_id) & Q(is_deleted=False) & Q(deallocate_on__isnull=True))
            print("allocatedeallocates :", allocatedeallocates)
            for allocatedeallocate in allocatedeallocates:
                device = tbldevice.objects.get(Q(device_id=allocatedeallocate.device_id) & Q(is_deleted=False))
                print("device : ", device)
                details = {'device_id': device.device_id, 'vehicle_number': vehicle.vehicle_number,
                           'device_name': device.device_name,
                           'allocated_DateTime': allocatedeallocate.allocate_on}
                appenddata.append(details)
                # print("appenddata :", appenddata)
        return Response(appenddata)
    def post(self, request):
        data = request.data
        device_id = data['device_id']
        print("device_id:", device_id)
        device = tbldevice.objects.get(device_id=device_id)
        print('device:', device)
        allocatedeallocate = tblallocatedeallocate.objects.get(device=device)
        allocatedeallocate.deallocate_on = datetime.now()
        allocatedeallocate.add_notes = data['add_notes']
        allocatedeallocate.save()
        device.available = "Yes"
        device.save()
        return Response({"message": "Deallocated the device"})

class AllocateView(APIView):
    def get(self, request, pk=None, vehicle_id=None):
        if vehicle_id != None:
            appenddata = []
            allocateDevices = tblallocatedeallocate.objects.filter(vehicle=vehicle_id)
            for allocateDevice in allocateDevices:
                device = tbldevice.objects.get(device_id=allocateDevice.device_id)
                serializer = DeviceSerializer(device)
                appenddata.append(serializer.data)
            # print("appenddata : ", appenddata)
            # print("result : ", serializer.data)
            return Response(appenddata, status=status.HTTP_200_OK)
        else:
            company_id = pk
            print("company_id : ", company_id)
            vehicles = tblvehicle.objects.filter(Q(company=company_id) & Q(is_deleted=False))
            print("all vehicles : ", vehicles)
            appenddata = []
            for vehicle in vehicles:
                print(" all for vehicle :", vehicle)
                allocatedeallocates = tblallocatedeallocate.objects.filter(
                    Q(vehicle=vehicle.vehicle_id) & Q(is_deleted=False) & Q(deallocate_on__isnull=True))
                print("allocatedeallocates :", allocatedeallocates)
                for allocatedeallocate in allocatedeallocates:
                    device = tbldevice.objects.get(Q(device_id=allocatedeallocate.device_id) & Q(is_deleted=False))
                    print("device : ", device)
                    details = {'vehicle_id': vehicle.vehicle_id, 'vehicle_number': vehicle.vehicle_number,
                               'vehicle_icons': vehicle.vehicle_icons,
                               'vehicle_marker': vehicle.vehicle_marker, 'device_id': device.device_id,
                               'device_name': device.device_name, 'add_notes': allocatedeallocate.add_notes,
                               'description': vehicle.description}
                    appenddata.append(details)
                    # print("appenddata :", appenddata)
            return Response(appenddata)

    def post(self, request):
        data = request.data
        print("data:", data)
        company_id = tblcompany.objects.get(company_id=data['company_id'])
        device_data = data['add_device']
        for i in range(0, len(device_data)):
            device = tbldevice.objects.get(device_id=device_data[i])
            device.available = "No"
            device.save()
            vehicle = tblvehicle.objects.get(vehicle_id=data['vehicle_id'])
            allocate_deallocate = tblallocatedeallocate.objects.create(vehicle=vehicle, device=device,add_notes=data['add_notes'])
            allocate_deallocate.allocate_on = datetime.now()
            allocate_deallocate.save()
        return Response("Posted")

    def put(self, request, pk):
        device_id = pk
        data = request.data
        print("allocate data:", data)
        device = tbldevice.objects.get(device_id=device_id)
        allocatedeallocate = tblallocatedeallocate.objects.get(device=device.device_id)
        allocatedeallocate.add_notes = data['add_notes']
        allocatedeallocate.save()
        serializer=AllocateDeallocateSerializer(allocatedeallocate)
        return Response({"message":"Edit"})

class AuditView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        file_serializer = AuditSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response({"message": "Uploaded"})
        else:
            return Response("Upload failed")

class FuelCalibrationView(APIView):
    def get(self,request,url=None):
        urldata=url
        if urldata!=None:

            reseller=tblreseller.objects.get(reseller_url=urldata)

            device_data=tbldevice.objects.filter(Q(reseller=reseller.reseller_id) &Q(is_deleted=False))
            print('device_data:',device_data)
            appenddata = []
            for device_datas in device_data:
                allocatedeallocate=tblallocatedeallocate.objects.filter(Q(device=device_datas.device_id))
                print('alllocatedeallocate:',allocatedeallocate)
                for allocatedeallocates in allocatedeallocate:
                    vehicle = tblvehicle.objects.get(vehicle_id=allocatedeallocates.vehicle_id)
                    print('vehicle:', vehicle)
                    fuel_data=TblFuelMgmt.objects.filter(Q(allocateddeallocate=allocatedeallocates.allocate_deallocate_id) &Q(is_deleted=False))
                    print('fuel_data:',fuel_data)
                    for fuel_datas in fuel_data:
                        sensor_data=tbldevice.objects.get(Q(device_id=fuel_datas.sensor_id))
                        print('sensor_data:',sensor_data)

                        details={'device_name':device_datas.device_name,'vehicle':vehicle.vehicle_number,
                                'sensor':sensor_data.device_name}
                        appenddata.append(details)
            return Response(appenddata,status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print("data :", data)
        allocateddevice = tblallocatedeallocate.objects.get(device=data['device'])
        sensor = tbldevice.objects.get(device_id=data['sensor_id'])
        sensor.available = "No"
        sensor.save()
        fuelmgmt = TblFuelMgmt.objects.create(allocateddeallocate_id=allocateddevice.allocate_deallocate_id,
                                              sensor_id=sensor.device_id, tank_capacity=data['tank_capacity'])
        fuelcalibration = TblFuelMgmt.objects.get(
            Q(allocateddeallocate_id=allocateddevice.allocate_deallocate_id) & Q(sensor_id=sensor.device_id) & Q(
                is_deleted=False))
        return Response({"message": "Created successfully!!", "fuelmgmt_id": fuelcalibration.fuel_mgmt_id})

class FuelCalibrationDataView(APIView):
    def post(self, request):
        data = request.data
        # print("fuel data : ", data)
        fuelcalibration = TblFuelMgmt.objects.get(fuel_mgmt_id=data['fuel_mgmt_id'])
        fuelcalibrationdata = FuelCalibrationData.objects.create(fuelmgmt=fuelcalibration,
                                                                 from_volt=data['from_volt'], to_volt=data['to_volt'],
                                                                 from_fuel=data['from_fuel'], to_fuel=data['to_fuel'])
        return Response({'message': "Fuel Calibration Details Registered Successfully"})

class SpeedoMeterView(APIView):
    def get(self,request,pk=None):
        company_id=pk
        print('company_id:',company_id)
        #reseller_data=tblreseller.objects.get(reseller_url=urldata)
        company_data=tblcompany.objects.filter(Q(company_id=company_id) &Q(is_deleted=False))
        print('company_data:',company_data)
        append_data=[]
        for company_datas in company_data:
            print('company_datas:',company_datas)
            vehicle_data=tblvehicle.objects.filter(Q(company=company_datas.company_id) & Q(is_deleted=False))
            print('vehicle_data:',vehicle_data)
            for vehicle_datas in vehicle_data:
                allocatedeallocate=tblallocatedeallocate.objects.filter(Q(vehicle=vehicle_datas.vehicle_id) &Q(is_deleted=False))
                print('allocatedeallocate:',allocatedeallocate)
                for allocatedeallocates in allocatedeallocate:
                    fuel_mgmt=TblFuelMgmt.objects.filter(Q(allocateddeallocate_id=allocatedeallocates.allocate_deallocate_id) &Q(is_deleted=False))
                    print('fuel_mgmt:',fuel_mgmt)
                    for fuel_mgmts in fuel_mgmt:
                        fuel_status=TblFuelStatus.objects.get(fuel_mgmt_id=fuel_mgmts.fuel_mgmt_id)
                        print('fuel_status:',fuel_status)
                        details={
                            'vehicle':vehicle_datas.vehicle_number,'tank_capacity':fuel_mgmts.tank_capacity,'fuel_level':fuel_status.fuel_level
                        }
                        append_data.append(details)
        return Response(append_data,status=status.HTTP_200_OK)


class LocationTracking(APIView):
    def get(self,request,pk=None):
        company_id = pk
        print("company_id : ", company_id)
        vehicles = tblvehicle.objects.filter(Q(company=company_id) & Q(is_deleted=False))
        print("all vehicles : ", vehicles)
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data)


def get_current_host(request) -> str:
    scheme = request.is_secure() and "https" or "http"
    return f'{scheme}://{request.get_host()}/'


class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]

    serializer_classes = {
        'login': serializers.UserLoginSerializer,
        'password_change': serializers.PasswordChangeSerializer,
    }

    @action(methods=['POST', ], detail=False)
    def login(self, request):
        print("request data: ", request.data)
        host_name = get_current_host(request)
        #print("host_name : ", host_name)
        serializer = self.get_serializer(data=request.data)
        #print("serializer : ", serializer)
        serializer.is_valid(raise_exception=True)
        user = get_and_authenticate_user(**serializer.validated_data)
        email = request.data.get('email', None)
        user_obj = User.objects.get(email=email)
        print("user_obj : ", user_obj)

        if user_obj and user_obj.is_superuser:
            data = serializers.AuthUserSerializer(user).data
            return Response(data=data, status=status.HTTP_200_OK)

        if user_obj and user_obj.user_type=="1"  :
            url = request.data['currentURL']
            reseller_data = tblreseller.objects.get(reseller_url=url)
            print('reseller_data:', reseller_data)
            print('reseller_data.is_deleted:', reseller_data.is_deleted)
            if user_obj and reseller_data.is_deleted == False and user_obj.user_url.url == request.data['currentURL'] and user_obj.is_deleted==False:  # request.data['currentURL']:
                data = serializers.AuthOtherUserserSerializer(user).data
                print("data:", data)
                return Response(data=data, status=status.HTTP_200_OK)

            return Response({"message": "please contact to your reseller"}, status=status.HTTP_200_OK)

        elif user_obj and user_obj.user_type == "2" :
            url = request.data['currentURL']
            reseller_data = tblreseller.objects.get(reseller_url=url)
            print("reseller_data:",reseller_data)
            company_data = tblcompany.objects.filter(Q(reseller=reseller_data) & Q(is_deleted=False))
            print('company_data:', company_data)
            for company in company_data:
                print("company:", company)
                if user_obj and company.is_deleted == False and user_obj.user_url.url == request.data['currentURL'] and user_obj.is_deleted==False and reseller_data.is_deleted==False:
                    data = serializers.AuthOtherUserserSerializer(user).data
                    print("data:", data)
                    return Response(data=data, status=status.HTTP_200_OK)

            return Response({"message": "please contact to your reseller"}, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

    @action(methods=['POST'], detail=False)
    def password_change(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.conf import settings


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
                                                   reset_password_token.key)
    email_from = settings.EMAIL_HOST_USER
    url = "http://localhost:3000/resetpassword/?token=" + reset_password_token.key
    html_message = '<button><a href="' + url + '">click on Reset Password</a></button>'

    send_mail(
        # title:
        "Password Reset for {title}".format(title="website title"),
        # message:
        email_plaintext_message,
        # from:
        email_from,
        # to:
        [reset_password_token.user.email],
        html_message=html_message
    )

#
#
# from django.shortcuts import render
#
# # Create your views here.
# from django.contrib.auth import get_user_model
# from django.core.exceptions import ImproperlyConfigured
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
#
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from . import serializers
#
#
# from .utils import get_and_authenticate_user
#
# User = get_user_model()
#
#
# def get_current_host(request) -> str:
#     scheme = request.is_secure() and "https" or "http"
#     return f'{scheme}://{request.get_host()}/'
#
#
# class AuthViewSet(viewsets.GenericViewSet):
#     permission_classes = [AllowAny, ]
#
#     serializer_classes = {
#         'login': serializers.UserLoginSerializer,
#
#     }
#
#     @action(methods=['POST', ], detail=False)
#     def login(self, request):
#         host_name = get_current_host(request)
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = get_and_authenticate_user(**serializer.validated_data)
#         email = request.data.get('email', None)
#         user_obj = User.objects.get(email=email)
#
#         if user_obj and user_obj.is_superuser:
#             data = serializers.AuthUserSerializer(user).data
#         elif user_obj and user_obj.url.url == host_name:
#             data = serializers.AuthOtherUserserSerializer(user).data
#         else:
#             error = {'message': 'This User is not belongs to any Group'}
#             return Response(error, status=status.HTTP_400_BAD_REQUEST)
#         return Response(data=data, status=status.HTTP_200_OK)
#
#     def get_serializer_class(self):
#         if not isinstance(self.serializer_classes, dict):
#             raise ImproperlyConfigured("serializer_classes should be a dict mapping.")
#
#         if self.action in self.serializer_classes.keys():
#             return self.serializer_classes[self.action]
#         return super().get_serializer_class()
#
#     @action(methods=['POST'], detail=False)
#     def password_change(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         request.user.set_password(serializer.validated_data['new_password'])
#         request.user.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#
#
# from django.dispatch import receiver
# from django.urls import reverse
# from django_rest_passwordreset.signals import reset_password_token_created
# from django.core.mail import send_mail
# from django.conf import settings
#
#
# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#     email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
#                                                    reset_password_token.key)
#     email_from = settings.EMAIL_HOST_USER
#     url = "http://localhost:3000/resetpassword/?token=" + reset_password_token.key
#     html_message = '<button><a href="' + url + '">click on Reset Password</a></button>'
#
#     send_mail(
#         # title:
#         "Password Reset for {title}".format(title="sapastelematicssystem.pvt.Ltd"),
#         # message:
#         email_plaintext_message,
#         # from:
#         email_from,
#         # to:
#         [reset_password_token.user.email],
#         html_message=html_message
#     )

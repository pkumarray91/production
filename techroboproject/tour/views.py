
from .serializers import *
from rest_framework.views import APIView
from rest_framework import generics,status
from .models import *
from rest_framework.response import Response


############################## API for Tour Creation #################################

class TourCreation_CRU_View(APIView):
    serializer_class= TourCreationSerializers

    def get(self,request,pk=None):
        id=pk
        if id is not None:
            tourcreation = TourCreation.objects.get(id=id)
            serializer=TourCreationSerializers(tourcreation)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            tourcreation=TourCreation.objects.filter(is_deleted=False)
            print("query :",tourcreation.query)
            serializer=TourCreationSerializers(tourcreation,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        data=request.data
        serializer=TourCreationSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self,request,pk):
        id=pk
        data=request.data
        tourcreation=TourCreation.objects.get(id=id)
        serializer=TourCreationSerializers(tourcreation,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk):
        id=pk
        tourcreation= TourCreation.objects.get(id=id)
        print(tourcreation)
        tourallocate=TourAllocate.objects.filter(Tour_Name=tourcreation).update(is_deleted=True)
        print('tourallocate', tourallocate)
        start_lat_lng=StartPoint.objects.get(start_address=tourcreation)
        end_lat_lng=EndPoint.objects.get(end_address=tourcreation)
        print('start_lat_lng:', start_lat_lng)
        print('end_lat_lng:',end_lat_lng)
        tourcreation.is_deleted = True
        start_lat_lng.is_deleted=True
        end_lat_lng.is_deleted=True
        tourcreation.save()
        start_lat_lng.save()
        end_lat_lng.save()
        serializer = TourCreationSerializers(tourcreation)
        data=serializer.data
        return Response({'msg':'delete success','data':data},status=status.HTTP_200_OK)


class StartPoint_CR_View(generics.ListCreateAPIView):
    queryset = StartPoint.objects.all()
    serializer_class = StartPointSerializers

class StartPoint_RU_View(generics.RetrieveUpdateAPIView):
    queryset = StartPoint.objects.all()
    serializer_class = StartPointSerializers

class EndPoint_CR_View(generics.ListCreateAPIView):
    queryset = EndPoint.objects.all()
    serializer_class = EndPointSerializers

class EndPoint_RU_View(generics.RetrieveUpdateAPIView):
    queryset = EndPoint.objects.all()
    serializer_class = EndPointSerializers




############################# API for Tour Allocated #################################


class TourAllocate_CRU_View(APIView):
    serializer_class = TourAllocateSerializers

    def get(self,request,pk=None):
        id=pk
        if id is not None:
            tourallocate = TourAllocate.objects.get(pk=id)
            serializer=TourAllocateSerializers(tourallocate)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            tourallocate=TourAllocate.objects.filter(is_deleted=False)
            serializer=TourAllocateSerializers(tourallocate,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        tour_data = request.data
        print("tour_data:", tour_data)
        Tour = TourCreation.objects.get(id=tour_data['Tour_Name'])
        print("tour is :", Tour)
        new_tour = TourAllocate.objects.create(tour_allocate_name=tour_data['tour_allocate_name'],Tour_Name=Tour,Vehicle_data=tour_data['Vehicle_data'],
                    is_deleted=tour_data['is_deleted'],Date_allocate=tour_data['Date_allocate'],Time_allocate=tour_data['Time_allocate'])
        print("new tour:", new_tour)
        new_tour.save()
        serializer = TourAllocateSerializers(new_tour)
        print("seriazliers_data:", serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        id=pk
        data = request.data
        tourallocate=TourAllocate.objects.get(pk=id)
        serializer = TourAllocateSerializers(tourallocate, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,pk):
        id=pk
        tourallocate= TourAllocate.objects.get(id=id)
        tourallocate. is_deleted = True
        tourallocate.save()
        serializer=TourAllocateSerializers(tourallocate)
        return Response({'msg':'delete success','data':serializer.data},status=status.HTTP_200_OK)


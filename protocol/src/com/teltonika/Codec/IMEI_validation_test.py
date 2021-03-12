from protocol.src.com.teltonika.Codec.IMEI_validation import *
"""
It is Driver code which calls IMEI_validation class and get the result
1. Get the hex_num 
   1.a. which contain the imei_number where the first 2 bytes gives the length of IMEI (000F)
   1.b. and the digit '3' is present before every imei_number  
2. To get the proper imei_number wehave to split it
3. If the return is True then it is correct valid IMEI
4. If the return is False then it is invalid IMEI

generate imei at:
https://generate.plus/en/number/imei

"""



#myimei = IMEI_validation(356307042441013)
#myimei = IMEI_validation(359632107452945)
#myimei = IMEI_validation(502695398174524)
#hex_num ='000F333536333037303432343431303133' #invalid imei
#hex_num ='000F333539363332313037343532393435'  #valid imei
#hex_num ='000F353032363935333938313734353234'  #valid imei
#hex_num ='000F353032363935333938313734353234'  #invalid imei
#hex_num = '000F353333383031353132353831313036' #valid imei
#hex_num = '000F333037383733303036373436323539' #valid imei
#hex_num = '000F353234303231333732303138313436' #valid imei
#hex_num = '000F343939383133373531373833393634'  #valid imei
#hex_num = '000F313033343536353635373937323937' #valid imei
hex_num = '000F313033343536353635373937323637' #invalid imei


# split the hex_num to get first 4 bytes
#hex_split1 = hex_num[:4]
# split the hex_num to get the remaining value
#hex_split2 = hex_num[4:]

#if int(hex_split1,16) != 15 :
    #print ("wrong size", hex_split1)
#else:
    #print("15 digit imei")

#test1 = len(str(hex_split2))

#to get the imei_number and remove the '3' digit from the hex_num
#my_imei = hex_split2[1:test1:2]
#print(my_imei)

myimei = IMEI_validation(hex_num)
valid_yes_no, imei_num = myimei.check_my_imei()
if valid_yes_no:
    print('IMEI valid ', imei_num)
else:
    print('IMEI invalid ', imei_num)


# raw_data, valid = myimei.checkIMEI()
#
# if valid:
#     val_imei = myimei.ImeiIsValid(self, raw_data)
#     if val_imei == True:
#         print("valid IMEI")
#     else:
#         print("Invalid IMEI")
#
# else:
#     print("Invalid IMEI")

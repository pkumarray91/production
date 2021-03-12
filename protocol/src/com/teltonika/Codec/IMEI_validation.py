"""
This class checks  the IMEI is valid or Invalid.

The validation is done by following steps:
1. It starts with the rightmost_value doubles the value of every second digit(eg. 4 becomes 8)
2. If the doubling of the rightmost_values is two digit number(eg. 9 * 2 = 18 ) and add the digits of the product(1+8)
3. Take the sum of all the digits in imeisum.
4. Checks if the imeisum is divisible by 10(eg. 50%10 ) then it is valid otherwise invalid

"""


class IMEI_validation:
    "class to check the IMEI "

    def __init__(self, imeinumber):
        self.imei = imeinumber

    def check_my_imei(self):
        check_imei, valid = IMEI_validation.checkIMEI(self)
        if valid:
            imei_is_valid = IMEI_validation.ImeiIsValid(self,check_imei)

            if imei_is_valid:
                return imei_is_valid, check_imei
            else:
                return imei_is_valid, 0
        else:
            return valid, 0

    # this function check the IMEI number is 15 or not
    def checkIMEI(self):
        netIMEI = self.imei
        # checkimei_valid = True
        hex_split1 = netIMEI[:4]
        # split the hex_num to get the remaining value
        hex_split2 = netIMEI[4:]

        # check the first four digit are 000F
        if int(hex_split1, 16) != 15:
            print("wrong size", hex_split1)
            checkimei_valid = False
            my_imei = int(0)
        else:
            print("000F in the starting")
            # checkimei_valid = True
            test1 = len(str(hex_split2))
            # to get the imei_number and remove the '3' digit from the hex_num
            my_imei = hex_split2[1:test1:2]
            # check the remaining my_imei is 15 or not
            if len(my_imei) != 15:
                checkimei_valid = False
            else:
                print("length is correct")
                checkimei_valid = True
                print(my_imei)

        return int(my_imei), checkimei_valid

    # Function for finding and returning sum of digits of a number

    def sumDig(self, rightmost_values):
        quotient = 0
        while rightmost_values > 0:
            quotient = quotient + (rightmost_values % 10)
            rightmost_values = (int(rightmost_values) / 10)

        return int(quotient)

    def ImeiIsValid(self, imei):
        imei_number = imei
        # print("imei_number",imei_number)

        rightmost_values = 0
        imeisum = 0

        # Loop for get the 15 digit of imei_number where i is looping variable.
        for i in range(15, 0, -1):
            # print("value if imei_number is : ",imei_number)
            rightmost_values = (int(imei_number) % 10)

            if i % 2 == 0:
                # Doubling every alternate digit
                rightmost_values = 2 * rightmost_values

            # Finding the sum of digits
            imeisum = imeisum + self.sumDig(rightmost_values)
            imei_number = int(imei_number) / 10

            # print("Output: iemisum = ", imeisum)

        return (imeisum % 10 == 0)


"""
# please check the IMEI_validation_test.py  
#myimei = IMEI_validation(356307042441013)
#myimei = IMEI_validation(359632107452945)
#myimei = IMEI_validation(502695398174524)
#hex_num ='000F333536333037303432343431303133' #invalid imei
#hex_num ='000F333539363332313037343532393435'  #valid imei
hex_num ='000F353032363935333938313734353234'  #valid imei
hex_split1 = hex_num[:4]
hex_split2 = hex_num[4:]

if int(hex_split1,16) != 15 :
    print ("wrong size", hex_split1)
else:
    print("15 digit imei")

test1 = len(str(hex_split2))
my_imei = hex_split2[1:test1:2]
print(my_imei)

myimei = IMEI_validation(int(my_imei))
val_imei = myimei.ImeiIsValid()
if val_imei == True:
    print("valid IMEI")
else:
    print("Invalid IMEI")

"""

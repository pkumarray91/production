"""
This class will get the HEX string from parent.
Simple steps:
1. get the AVL data count from thee front and end as it is in the hex string
2. compare the avl data count
3. if the data count is same then send TRUE and avl data count as integer
4. if the data count is not same then send FALSE and duff avl data count as integer

"""


class avl_data_package_count:
    ' class to get the avl data count number if the hex string has the same number otherwise FALSE'

    def __init__(self, hex_str):
        self.hex_str = hex_str

    def avl_data_count_comparison(self):

        # send duff data count when data count does not match
        duff_data_count = 0000
        # getting AVL data count from the beginning
        start_data_count = self.hex_str[18:20]
        # getting AVL data count from the end
        end_data_count = self.hex_str[-8:-10:-1]

        # print(start_dat_count)    # printing the value of 1st avl data
        # print(end_data_count)     # printing the value of 2nd avl data

        # here the checking is done it should be equal
        if start_data_count == end_data_count:
            # print("correct avl data package")
            return True,"%08d"%int(start_data_count)
        else:
            # print("wrong AVL")
            return False,"%08d"%int(duff_data_count)



"""
Write a small script to call the class and get the results
"""
"""
# call the class avl_Data_package_count
hex_str="000000000000003608020000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000020000C7CF"
my_avl_data_count = avl_data_package_count(hex_str)
my_result, data_count = my_avl_data_count.avl_data_count_comparison()
if my_result is True:
    print("AVL data count matches",data_count)
else:
    print ("AVL data count does not match", data_count)

"""
from protocol.src.com.teltonika.Codec.avl_data_package_count import *

"""
Write a small script to call the avl_data_package_count class and get the results
1. define the hex_str which will be sending
2. calling the class and sending hex_str as parameter
3. avl_data_package_count returns two values. True/false and AVL data count
3.1. If the return is false and Avl data count is 10000 means the hex_str is not correct
3.2. If the return is true  and Avl data count is an int then hex_str is correct

"""
# call the class avl_Data_package_count
hex_str="000000000000003608030000016B40D8EA30010000000000000000000000000000000105021503010101425E0F01F10000601A014E0000000000000000020000C7CF"
my_avl_data_count = avl_data_package_count(hex_str)
my_result, data_count = my_avl_data_count.avl_data_count_comparison()
if my_result is True:
    print("AVL data count matches",data_count)
else:
    print ("AVL data count does not match", data_count)
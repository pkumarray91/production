


class twos_complement:
    def __init__(self,hexstr,bits):
        self.hexstr = hexstr
        self.bits = bits


    def twos_complement(self):

        hexstr = self.hexstr
        bits = self.bits


        value = int(hexstr, 16)
        #print("value",value)

        if value & (1 << (bits - 1)):

            value -= 1 << bits
            #print("value1",value)

        return value


#c = new('0000D7f2',16)
#b = c.twos_complement()
#print("b",b)
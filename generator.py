import sys
import csv
import shutil
import itertools
import random
from time import time, sleep
from datetime import datetime

headers = "id,protocol,source_ip,destination_ip,src_port,dst_port,payload_size,flags,date,time,duration,class,attack_type,attack_id,attack_description"

#column 1
id = 1

#column 2
protocols = ["TCP", "UDP", "ICMP"]

#columns 3 and 4
source_ip = ""
destination_ip = ""

# columns 5 and 6
ports = []

flags = []

classification = ["normal", "attacker", "victim", "suspicious", "unknown"]
attack_id = 0
attack_types = ["portScan", "bruteForce", "dos"]

# file information
file_position = 0
file_path = '/home/cyberalarm/gui/web-gui/CyberAlarm/index/static/index/csv/test.csv'

# set headers in CSV file.
csv_file = open(file_path, "w")
csv_file.write(headers + "\n")
csv_file.close()

csv_file = open(file_path, "a")
sys.stdout = csv_file
while True:

    payload_size = random.randint(100,300)
    
    for x in range(2):
    
        #date and time column
        today = datetime.now()
        todays_date = today.strftime("%Y-%m-%d")
        todays_time = today.strftime("%H:%M:%S")
    
        source_ip = ("192.168." + str(random.randint(1,250)) + "." + str(random.randint(1,250)))
        destination_ip = (str(random.randint(192,220)) + "." + str(random.randint(0,250)) + "." + str(random.randint(0,250)) + "." + str(random.randint(1,250)))
        ports.append(random.randint(1,2000))

        protocol = random.choice(protocols)

        source_port = str(random.choice(ports))
        destination_port = str(random.choice(ports))

        classed = random.choice(classification)
        if classed == "attacker":
            attack_type = random.choice(attack_types)
            attack_description = "An attack is or has taken place."
            attack_id+=1
        else:
            attack_id=0
            attack_type = "---"
            attack_description = "---"

        print(str(id) + "," + protocol + "," + source_ip + "," + destination_ip + "," + source_port + "," + destination_port + "," + str(payload_size) + ",," + todays_date + "," + todays_time + ",0," + classed + "," + attack_type + "," + str(attack_id) + "," + attack_description + "\n", end=' ', flush=True)
        id+=1
    
    sleep(20)


sys.stdout.close()

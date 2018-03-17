# Simple demo of of the LSM303 accelerometer & magnetometer library.
# Will print the accelerometer & magnetometer X, Y, Z axis values every half
# second.
# Author: Tony DiCola
# License: Public Domain
import time

# Import the LSM303 module.
import Adafruit_LSM303


# Create a LSM303 instance.
lsm303 = Adafruit_LSM303.LSM303(hires=False,busnum=1)

# Alternatively you can specify the I2C bus with a bus parameter:
#lsm303 = Adafruit_LSM303.LSM303(busum=2)


#while True:
    # Read the X, Y, Z axis acceleration values and print them.
accel, mag = lsm303.read()
    # Grab the X, Y, Z components from the reading and print them out.
accel_x, accel_y, accel_z = accel
mag_x, mag_z, mag_y = mag
print accel_x
print accel_y
print accel_z
#    print mag_x
#    print mag_y
#    print  mag_z
    

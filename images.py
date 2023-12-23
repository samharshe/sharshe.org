import os

# Define the directory where the files are located
directory = "files"

# Delete files named "xx.jpeg" for xx from 01 to 175
for i in range(1, 176):
    file_to_delete = os.path.join(directory, f"{i:02d}.jpeg")
    if os.path.exists(file_to_delete):
        os.remove(file_to_delete)
        print(f"Deleted {file_to_delete}")

# Rename files named "xx Large.jpeg" to "xx.jpeg" for xx from 01 to 175
for i in range(1, 176):
    file_to_rename = os.path.join(directory, f"{i:02d} Large.jpeg")
    if os.path.exists(file_to_rename):
        new_file_name = os.path.join(directory, f"{i:02d}.jpeg")
        os.rename(file_to_rename, new_file_name)
        print(f"Renamed {file_to_rename} to {new_file_name}")
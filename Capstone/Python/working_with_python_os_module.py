import os

# lists the contents of a directory
os.listdir(".")

# renames a file or directory
# os.rename("old_file", "new_file")

# changes the permission settings of a file or directory
# os.chmod("filename | directory", 0o777)

# make a new directory
# os.mkdir("directory name")

# recursively create a directory path
# os. makedirs("my_folder/my_subfolder")

# remove or delete a file
# os.remove("filename")

# delete a single directory
# os.rmdir("directory_path | directory name")
# os.rmdir('directory name')

# delete a tree of directories
# os.removedirs("<directory_path>")
# os.removedirs('my_folder') # this didn't work, needed shutil.remtree for recusive removal

# get stats about a file or directory.
# os.stat("<filname | directory>")
# print(os.stat("medium"))

# current_directory = os.getcwd()
# print(current_directory)

#########################
# Find a file

import os
# case
def find_file(file_name="tree.py"):
    list_dir = [
        os.getcwd(),
        os.path.expanduser("~/"),
        os.path.dirname(os.path.abspath(__file__))
    ]

    for path in list_dir:
        if path is not None:
            file_path = os.path.join(path, file_name)
            if os.path.exists(file_path):
                print(f"Checking {file_path}")
                return file_path

    print(f"File {file_name} has not been found")

# trigger
file_name = find_file()
if file_name:
    print(f"Found file at: {file_name}")


#####################
# interact with the operating system

import os

# case

# get the current working directory
os.getcwd()

# change the current working directory
os.chdir("<dir_name>")

os.getcwd()

# the os.environ holds the environment variable
# we set when the os module is loaded
os.environ.get("CONFIG")

# this is the setting and environment variable.
# this setting exists for subprocesses' spawned
# from the code
os.environ["CONFIG"] = "DEBUG"

os.environ.get("CONFIG")

# this is the login of the user in
# the terminal that spawned this process.
os.getlogin()
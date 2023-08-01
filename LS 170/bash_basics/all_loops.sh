counter=0
max=6

echo while loop

while [[ $counter -le $max ]]
do
  echo $counter
  ((counter++))
done

echo until loop
counter=0

until [[ $counter -eq $max ]]
do
  echo counting up
  echo $counter
  ((counter++))
done

echo for loop

numbers='1 2 3 4 5 6'

for number in $numbers
do
  echo $number
done




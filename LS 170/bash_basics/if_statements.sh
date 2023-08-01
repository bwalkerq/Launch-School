string='esther kim is dope'

if [[ -n $string ]]
then
  echo $string
fi

integer_1=11
integer_2=11

if [[ $integer_1 -eq $integer_2 ]]
then
  echo $integer_1 and $integer_2 are of equal value!
  fi

if [[ -e ./hello_world.sh ]]
then
  echo yes this file exists.
  fi

integer=9

if [[ $integer -le 5 ]] || [[ $integer -ge 10 ]]
then
  echo the integer $integer is not strictly between 5 and 10
else
  echo the integer $integer is strictly between 5 and 10
  fi
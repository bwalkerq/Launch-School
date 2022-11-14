=begin  
## Things I learned:
- chaining methods after a method with a block is totally a thing 
  e.g names.select { |x| x.length > 60}.join(' ')

  - #11 I overlooked that the method to transform stars involved a for loop; a for loop returns the original object
def star_method(stars)
  for star in stars
    star.downcase
  end
end
returns the stars array, rather than transforming the array

- #17 learned: a new array is not a reference to an original array, even if the elements of the new array are identical to the original array.
This was a toss up because of the phrase "reference to the original array"; I knew that the method reject returned a new array, but in this case
the new array had all of the same elements, so I thought that even though the object (array) was new, that it referenced (pointed to) the original
array.

- #18 no new learning, overlooked detail: the names of the true and false arrays were swapped order. I already knew that
in a #partition, the values for which the block returns truthy are assigned to the first 
array, and the falsey returning elements are assigned to the second array.

- #19 relearned that Enumerable#select on a hash returns an array, not a hash (Same with Enumerable#map)
learned that #find_all is an alias for #select

- #20 no new learning, overlooked detail: a <=, should have been <. 

Summary: 
- chaining methods after a block is doable
- A for loop returns original object
- #select and #map on hash caller returns an array
- # select and #map return a new array, and even if the original and new arrays are identical, the new array is NOT a reference to the original

=end


mailing_campaign_leads = [
  {name: 'Emma Lopez', email: 'emma.lopez@some_mail.com', days_since_login: 423, mailing_list: true},
  {name: 'mike richards', email: 'michael.richards@some_mail.com', days_since_login: 23, mailing_list: false},
  {name: 'JANE WILLIAMS', email: 'jane_w95@my_mail.com', days_since_login: 16, mailing_list: true},
  {name: 'Ash Patel', email: 'ash_patel@my_mail.com', days_since_login: 22, mailing_list: true}
]
counter = 0

loop do
  break if counter == mailing_campaign_leads.size
  full_name = mailing_campaign_leads[counter][:name]
  names = full_name.split

  names_counter = 0
  loop do
    break if names_counter == names.size
    name = names[names_counter]
    names[names_counter] = name.capitalize

    names_counter += 1
  end

  capitalized_full_name = names.join(' ')
  mailing_campaign_leads[counter][:name] = capitalized_full_name

  counter += 1
end

usable_leads = []
counter = 0

loop do
  break if counter == mailing_campaign_leads.size
  last_login = mailing_campaign_leads[counter][:days_since_login]
  subscribed_to_list = mailing_campaign_leads[counter][:mailing_list]

  if last_login < 60 && subscribed_to_list
    usable_leads << mailing_campaign_leads[counter]
  end

  counter += 1
end

p mailing_campaign_leads
p usable_leads

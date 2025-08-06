# React Todo App

## "Main area" requirements
1. clicking on "add new to do" shows the modal

2. displays the current selected "todo group" with the corresponding count of todos`
   1. this is done, but not dynamic (if I choose to do the nav bar, I'll have more to do)  
3. hovering on a todo item highlights the todo. clicking on the area surrounding the todo name toggles the todo state (complete/not complete)
   1. this will need a handler to toggle the state
   2. it'll be easier with React, right?
4. The two name displayed on the to do list is of the following form – title – month/year. If the 22 doesn't have both a month a year, the two displayed of the form titled – no due date. Covering over the 2-D name highlights. Clicking and shows the photo with the corresponding details.
5. Covering on the trash bin area highlighted. Clicking on the trash bin or its surrounding area deletes the two both on the server and in the browser.
6. The TV is toggle/deleted currently selected two different group should not change. The two days in the main area should reflect what is currently selected, and the corresponding count of should reflect the account accordingly.
7. Completed two days should be on the bottom of the list.

## Modal requirements
1. The model displays the appropriate content.
   - when adding a new item, the fields should be empty with placeholder texts.
   - when clicking on an existing item, the fields should contain the two detail where available.
2. Clicking "save" closes the modal.
    - when adding a new item, it selects the all to do group from the NAV area
    - when clicking on an existing item, it retains the currently selected group.
    - all created/updated to are listed under "no due date" and less maintained data for both the month and the year Fields
    - it allows resetting a two details back to their default values. As an example, a user could move to do with the date of 2–23 to the "no due date" category by resetting its month and year fields.
    - it saves the details that were provided accordingly
3. Clicking "Mark as complete":
   - when adding a new item, it alerts the user that it cannot be done.
   - when clicking on an existing item, it marks the todo as completed
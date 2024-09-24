async function fetchRequest(endpoint){
  const response = await fetch('http://localhost:3000/api/' + endpoint);
  const data = await response.json();
  return data;
}

// fetchRequest('staff_members').then(res => console.log(res));
// fetchRequest('students').then(result => console.log(`there are ${result.length} students` ))

function makeRequest(endpoint) {
  return new Promise(resolve => {
    let request = new XMLHttpRequest();
    request.open('GET', 'api/' + endpoint);
    request.responseType = 'json';

    request.addEventListener('load', () => {
      resolve(request.response);
    });

    request.send();
  });
}

function deleteSchedule(id) {
  return new Promise(resolve => {
    let request = new XMLHttpRequest();
    request.open('DELETE', 'api/schedules/' + id);
    request.responseType = 'json';

    request.addEventListener('load', () => {
      resolve(request.response);
    });

    request.send();
  });
}


// deleteSchedule(6);
// deleteSchedule(8);
// deleteSchedule(9);


function availableSchedules() {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';
  request.timeout = 3000;

  let string = '';

  request.addEventListener('load', ev => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      for (const schedule of schedules) {
        const key = `staff ${String(schedule['staff_id'])}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      }

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`)
        .join('\n'));
    } else {
      alert('There are no schedules available for booking');
    }
  });

  request.ontimeout = () => alert('Request Timeout');

  request.onloadend = () => alert('Request has been completed.')

  request.send();
}

// availableSchedules();

function addStaff() {


}

























































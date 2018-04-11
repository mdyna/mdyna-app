export default function generateShortLink(task) {
  fetch('http://localhost:7000/addTask/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(data => data.json())
    .then(res =>
      console.log(`**TEMPORARY** Go to: localhost:7000/task/${res} to view your task`),
    )
    .catch(error => console.log(error));
}

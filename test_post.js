async function run() {
  const res = await fetch('http://37.60.247.58:4000/api/twitter-accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'test1', password: 'p' })
  });
  const text = await res.text();
  console.log("Status:", res.status, "Body:", text);
}
run();

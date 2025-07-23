export async function GET(request) {
  const users = [
    { id: 1, name: "Ashraful Islam" },
    { id: 2, name: "Sayem Islam" },
  ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;
  const newUser = { id: Date.now(), name, email, password };
}

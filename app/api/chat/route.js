export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ response: "Please type a message." });
    }

    let reply = "Hello from Aether. ";

    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether. I have memory. What would you like me to do?";
    } else if (lower.includes("who are you")) {
      reply = "I am Aether, your personal AI agent. I can remember conversations and help with research, business planning, and more.";
    } else {
      reply = `You said: "${message}"\n\nI'm ready. Ask me to research the scrap metal market, create a business plan, or anything else.`;
    }

    return Response.json({ response: reply });

  } catch (error) {
    return Response.json({ response: "Sorry, I had an error. Please try again." });
  }
}

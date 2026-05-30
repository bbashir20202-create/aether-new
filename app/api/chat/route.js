export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return Response.json({ response: "Please type a message." });
    }

    let reply = "I'm here boss. ";

    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hello Boss 👋 I'm Aether. I remember our conversations. What would you like to do today?";
    } else if (lower.includes("who are you") || lower.includes("your name")) {
      reply = "I am Aether — your personal cloud agent with memory. I can help you with research, business planning, analysis, and more.";
    } else if (lower.includes("remember") || lower.includes("memory")) {
      reply = "I remember our previous chats. Tell me what you want me to focus on or research.";
    } else {
      reply += `You said "${message}".\n\nTry asking me to research the scrap metal market, make a business plan, analyze competitors, or anything else.`;
    }

    return Response.json({ response: reply });

  } catch (error) {
    console.error(error);
    return Response.json({ response: "Sorry, something went wrong. Please try again." });
  }
}

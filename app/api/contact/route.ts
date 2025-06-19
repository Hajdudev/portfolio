import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const contactsFilePath = path.join(process.cwd(), "contact-submissions.json");

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
};

const readSubmissions = (): ContactSubmission[] => {
  if (!fs.existsSync(contactsFilePath)) {
    return [];
  }

  const data = fs.readFileSync(contactsFilePath, "utf8");
  return JSON.parse(data);
};

const writeSubmissions = (submissions: ContactSubmission[]) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify(submissions, null, 2));
};

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    console.log("Received form data:", {
      name,
      email,
      message: message.substring(0, 20) + "...",
    });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const newSubmission: ContactSubmission = {
      id: Date.now().toString(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    const submissions = readSubmissions();

    submissions.push(newSubmission);

    writeSubmissions(submissions);

    console.log("Contact form saved:", newSubmission.id);

    return NextResponse.json({
      success: true,
      message: "Your message has been received!",
      id: newSubmission.id,
    });
  } catch (error: unknown) {
    console.error("Error processing contact form:", error);

    return NextResponse.json(
      {
        error: "Failed to save message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const submissions = readSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 },
    );
  }
}

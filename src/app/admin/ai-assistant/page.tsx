import { CreativeAssistantForm } from "./creative-assistant-form";

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Creative Assistant</h1>
        <p className="text-muted-foreground">
          Generate story starters and activity ideas for your classroom.
        </p>
      </div>
      <CreativeAssistantForm />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashBoardRoute() {
  const session = await requireUser();

  return (
    <div>
      <h2>Hello from Dashboard</h2>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}

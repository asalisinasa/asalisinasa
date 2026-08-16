import { SystemStatus, SystemStatusLink } from "./_components/system-status";

export default function NotFound() {
  return (
    <SystemStatus
      code={404}
      message="page not found"
      detail="No route matches this URL"
    >
      <SystemStatusLink href="/">cd ~/</SystemStatusLink>
    </SystemStatus>
  );
}

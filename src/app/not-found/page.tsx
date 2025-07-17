import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>404 - Page Not Found123</div>
    </Suspense>
  );
}

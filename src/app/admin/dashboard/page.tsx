import { Suspense } from "react";

import { Dashboard } from "@/widgets/admin/dashboard/ui/Dashboard/Dashboard";

const AdminDashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default AdminDashboardPage;

export const dynamic = "force-dynamic";

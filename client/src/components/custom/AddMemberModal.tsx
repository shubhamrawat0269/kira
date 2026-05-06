import { useState } from "react";
import { addUserToProject } from "@/services/project";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string | null;
  onSuccess?: () => void;
}

export default function AddMemberModal({
  open,
  setOpen,
  projectId,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      const res = await addUserToProject(projectId, email);
      toast.success(res.data.message || "User added successfully!");
      setEmail("");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user. Please check the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button onClick={handleAddUser} disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

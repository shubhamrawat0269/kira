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

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
  onSuccess: () => void;
}

export default function AddMemberModal({
  open,
  setOpen,
  projectId,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState("");

  const handleAddUser = async () => {
    try {
      await addUserToProject(projectId, email);

      setEmail("");
      setOpen(false);
      onSuccess();
    } catch (err) {
      console.error(err);
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
          />

          <Button onClick={handleAddUser} className="w-full">
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

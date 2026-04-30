import { useState } from "react";
import API from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProjectModalProps, FormState } from "@/types/project";

export default function CreateProjectModal({
  open,
  setOpen,
  onSuccess,
}: CreateProjectModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
  });

  const handleCreate = async () => {
    try {
      await API.post("/api/project/create-project", form);

      setOpen(false);
      setForm({ name: "", description: "" });

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Project Name"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Button onClick={handleCreate} className="w-full">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

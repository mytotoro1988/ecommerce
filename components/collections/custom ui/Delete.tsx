import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

const Delete = () => {
  return (
    <Button className="bg-red-1 text-white">
      <Trash2 className="h4 w-4" />
    </Button>
  );
};

export default Delete;

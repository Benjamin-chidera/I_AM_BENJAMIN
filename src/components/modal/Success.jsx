import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const Success = ({handleOpen, open, setOpen}) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

  return (
    <main>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>THANKS YOU FOR REACHING OUT </DialogHeader>
        <DialogBody>I will reply as soon as possible👨🏾‍💻💻</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          ></Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Continue</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </main>
  );
};

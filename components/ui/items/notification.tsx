"use client";
import { Button } from "../button";
import { useState } from "react";

export default function NotificationComp() {
  const [visible, setVisible] = useState(true);
  return (
    <div
      className={`flex fixed w-full right-1/2 left-1/2 bg-background-shade-light items-center gap-4 border-2 border-border hover:border-primary p-4 rounded-2xl max-w-150
        transition-all duration-300 ${visible ? "" : "hidden"}`}
    >
      <div className="text-sm">Two-factor authentication is off. Enable it</div>
      <Button>Activate 2FA</Button>
      <button
        className="px-2 hover:bg-text-subtle/50 text-xl rounded-4xl transition-all duration-300"
        onClick={() => {
          setVisible(false);
        }}
      >
        x
      </button>
    </div>
  );
}

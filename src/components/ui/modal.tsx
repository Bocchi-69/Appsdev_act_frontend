import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/60 backdrop-blur-md p-4 lg:p-6" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-cream-50 rounded-2xl border border-biscuit-200 shadow-2xl shadow-brown-900/30 flex flex-col max-h-[90vh] text-brown-800"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex shrink-0 items-center justify-between border-b border-biscuit-200 px-6 py-4">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

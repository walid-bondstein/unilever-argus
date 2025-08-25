import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

const ToastProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Toaster richColors expand={false} />
            {children}
        </>
    );
};
export default ToastProvider;

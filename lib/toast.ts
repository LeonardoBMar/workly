import { toast } from "sonner";

export const notifyError = (msg: string) => toast.error(msg);
export const notifySuccess = (msg: string) => toast.success(msg);

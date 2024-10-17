import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useManagerUI } from "@/store/app-store";

export default function LayoutUI({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {
    ui: { isOpenAlert },
  } = useManagerUI();
  
  return (
    <>
      {children}
      <AlertDialog open={isOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desear eliminar esta cita?</AlertDialogTitle>
            <AlertDialogDescription>
              Al eliminar esta cita, no podrás verla en la lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

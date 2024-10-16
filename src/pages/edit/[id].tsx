import { useRouter } from "next/router";
import Layout from "@/app/layout";
import Stepper from "@/components/atomic-design/molecules/stepper";

const steps = ["Cliente", "Cita", "Resumen"];

export default function Edit() {
  const router = useRouter();

  return (
    <Layout>
      <h2 className="text-4xl mb-12 font-bold">Crear Cita</h2>
      <p>Post: {router.query.id}</p>
    </Layout>
  );
}
